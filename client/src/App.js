///** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useToken from "./components/tools/useToken";
import useOfflineStorage from "./components/tools/useOfflineStorage";
import Notes from "./components/routes/Notes";
import Topics from "./components/displays/Topics";
import LoadingDisplay from "./components/displays/Loading";
import Login from "./components/routes/Login";
import Logout from "./components/routes/Logout";
import { ToastContainer, toast } from "react-toastify";
import { staticSizes, mixins, baseTypes } from "./styles/globalStyles";
import "react-toastify/dist/ReactToastify.min.css";
import { formatThemesList, getThemeSizes } from "./styles/themeHelper";
import { getFontStyles } from "./styles/fonts";
import { useSettings } from "./components/tools/useSettings";
import { ThemeProvider, Global } from "@emotion/react";
import defaultColors from "./styles/defaultColors";
import defaultSizes from "./styles/defaultSizes";

const defaultTheme = {
  colors: defaultColors,
  font: getFontStyles("System Default"),
  sizes: defaultSizes,
};

const getSetTheme = async (settings, setTheme, setThemesObject) => {
  await fetch("api/themes")
    .then((res) => res.json())
    .then((resThemes) => {
      const themesFormated = formatThemesList(resThemes);
      setThemesObject(themesFormated);
      const newTheme = {
        colors: themesFormated.getTheme(settings.theme),
        font: getFontStyles(settings.font),
        sizes: getThemeSizes(settings.textSize),
      };
      setTheme(newTheme);
    });
};

function App() {
  const { token, setToken, resetToken } = useToken();
  const { settings } = useSettings();
  const { offlineStorage, setOfflineStorage } = useOfflineStorage();
  const [theme, setTheme] = useState(defaultTheme);
  const [topics, setTopics] = useState([]);
  const [spaceID, setSpaceID] = useState("");
  const [tags, setTags] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({ topics: [] });
  const [themesObject, setThemesObject] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingFade, setLoadingFade] = useState(true);
  const [loadScreen, setLoadScreen] = useState(true);

  // TODO finish caching/local offline storage. Needs a limit of some sort
  useEffect(() => {
    // pull and set content list
    if (loading) {
      setLoadScreen(true);
      const setContent = async () => {
        const controller = new AbortController();
        // 5 second timeout:
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        const setStates = (content) => {
          setTopics(content.topics);
          if (content.topics.length > 0) {
            setCurrentCategory(content.topics[0]);
          }
          setTags(content.tags);
          setSolutions(content.solutions);
          setSpaceID(content.spaceID);
          setTimeout(() => {
            setLoadingFade(false);
          }, 1200);
          setLoading(false);
        };
        return await fetch("/api/content", { signal: controller.signal })
          .then((res) => {
            return res.json();
          })
          .then((content) => {
            clearTimeout(timeoutId);
            getSetTheme(settings, setTheme, setThemesObject);
            setStates(content);
            //setOfflineStorage(content);
            console.info("Fetched content");
          })
          .catch((err) => {
            if (err.name === "AbortError" && loading) {
              return;
            }
            toast.info(
              "Timeout reached while fetching content. Using local backup."
            );
            getSetTheme(settings, setTheme, setThemesObject);
            setStates(offlineStorage);
          });
      };
      setContent();
    }
  }, [loading, offlineStorage, setOfflineStorage, settings]);

  /*
    contentToAdd = {
      newTags: newTags[],
      newImages: newImages[],
      newSolutions: newSolutions[],
      newTopic: topicToAdd{},
    }
  */
  const addToContentList = ({ newTags, newSolutions, newTopic }) => {
    // stop duplicates:
    if (newTopic.id === topics[topics.length - 1].id) {
      return;
    }
    if (newTags.length > 0) {
      var newTagsList = [].concat(tags, newTags);
      setTags(newTagsList);
    }
    if (newSolutions.length > 0) {
      var newSolutionsList = [].concat(solutions, newSolutions);
      setSolutions(newSolutionsList);
    }
    if (newTopic) {
      for (let i = 0; i < topics.length; i++) {
        if (topics[i].id === newTopic.category.id) {
          var newTopicsList = topics;
          newTopicsList[i].topics = [].concat(newTopic, topics[i].topics);
          setTopics(newTopicsList);
          setCurrentCategory(newTopicsList[i]);
          break;
        }
      }
    }
  };

  /*
  topics,
    setCurrentCategory,
    currentCategory,
    token,
    tags,
    setTopics,
    addToContentList,
    spaceID,
    loading
  */
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Global
          styles={css`
            ${theme.font};
            html {
              width: 100vw;
              overflow-x: hidden;
              overflow-y: ${loadingFade && "hidden"};
              font-size: ${theme.sizes.baseFontSize}px;
            }
            body {
              font-size: ${theme.sizes.baseFontSize}px;
              line-height: 1.5;
              background-color: ${theme.colors.background};
              margin: 0;
            }
            code {
              font-family: source-code-pro, Menlo, Monaco, Consolas,
                "Courier New", monospace;
            }
            a {
              ${mixins.transition()};
              color: ${theme.colors.link};
              &:visited {
                color: ${theme.colors.link};
              }
              ${baseTypes.hover} {
                color: ${theme.colors.linkHover};
              }
              font-family: inherit;
            }
            .highlighted {
              color: red;
            }
            p,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            li {
              color: ${theme.colors.white};
              font-family: inherit;
            }
            button {
              ${mixins.transition()};
              cursor: pointer;
              font-family: inherit;
              border: 0;
              border-radius: ${staticSizes.radius};
              &:disabled {
                cursor: default;
              }
            }
            input {
              ${mixins.transition("all", 150)};
              color: ${theme.colors.white};
              width: 100%;
              border: 0;
              font-family: inherit;
              &::placeholder {
                color: ${theme.colors.placeholder};
              }
              &:placeholder-shown {
                text-overflow: ellipsis;
              }
            }

            ::-webkit-scrollbar-track {
              border-radius: ${staticSizes.radius};
              background-color: ${theme.colors.secondary};
            }

            ::-webkit-scrollbar {
              width: 8px;
              height: 6px;
            }

            ::-webkit-scrollbar-thumb {
              border-radius: ${staticSizes.radius};
              background-color: ${theme.colors.primary};
            }
            :focus-visible {
              outline: none;
            }
          `}
        />
        <ToastContainer
          theme="dark"
          toastStyle={{
            backgroundColor: defaultColors.primary,
            fontSize: "18px",
          }}
          position="top-center"
          autoClose={7000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {loadScreen && (
          <LoadingDisplay
            setLoadScreen={setLoadScreen}
            loading={loadingFade ? 1 : 0}
          />
        )}
        <Routes>
          <Route
            key={"login"}
            path="/oauth/redirect"
            element={<Login setToken={setToken} />}
          />
          <Route
            key={"logout"}
            path="/logout"
            element={<Logout resetToken={resetToken} />}
          />
          <Route
            key={"home"}
            path="/"
            element={
              <Notes
                topics={topics}
                setCurrentCategory={setCurrentCategory}
                currentCategory={currentCategory}
                tags={tags}
                spaceID={spaceID}
                token={token}
                loading={loading}
                setTopics={setTopics}
                addToContentList={addToContentList}
                setLoading={setLoading}
                themesObject={themesObject}
                solutions={solutions}
                setLoadScreen={setLoadScreen}
                setTheme={setTheme}
                setLoadingFade={setLoadingFade}
              />
            }
          />
          <Route key="wildcard" from="*" element={<Topics />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
