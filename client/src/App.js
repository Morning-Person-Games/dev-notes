///** @jsxImportSource @emotion/react */
import { useState, useEffect, useCallback } from "react";
import { css } from "@emotion/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useToken from "./components/tools/useToken";
//import useOfflineStorage from "./components/tools/useOfflineStorage";
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

const getSetTheme = async (
  settings,
  setTheme,
  setThemesObject,
  resetSettings,
  setSettings
) => {
  await fetch("api/themes")
    .then((res) => res.json())
    .then((resThemes) => {
      if (resThemes.length > 0) {
        if (settings.theme !== "Default") {
          if (!resThemes.some((t) => t.title === settings.theme)) {
            toast.warning("Issue finding saved theme, resetting to default.");
            resetSettings();
            setSettings(defaultTheme);
            setTheme(defaultTheme);
            return;
          }
        }
        const themesFormated = formatThemesList(resThemes);
        setThemesObject(themesFormated);
        const newTheme = {
          colors: themesFormated.getTheme(settings.theme),
          font: getFontStyles(settings.font),
          sizes: getThemeSizes(settings.textSize),
        };
        setTheme(newTheme);
      } else {
        setTheme(defaultTheme);
      }
    })
    .catch((err) => {
      console.warn("No themes found, setting default theme. Error: ", err);
      setTheme(defaultTheme);
      return;
    });
};

const getTopicTitleList = (topics) => {
  const topicTitles = [];
  topics.forEach((category) =>
    category.topics.forEach((topic) => topicTitles.push(topic.title))
  );
  return topicTitles;
};

const getSavedCategory = () => {
  const categoryString = localStorage.getItem("category");
  const userCategory = JSON.parse(categoryString);
  return userCategory ? userCategory : "";
};

const getCurrentTopicsFromCategory = (topics) => {
  const savedCategory = getSavedCategory();
  if (savedCategory) {
    const savedTopics = topics.find((c) => c.category === savedCategory);
    if (savedTopics) {
      return savedTopics;
    } else {
      console.warn(
        "Somehow the locally stored category no longer exists. Setting it to default."
      );
      localStorage.removeItem("category");
    }
  }
  return topics[0];
};

function App() {
  // what is a useReducer lol
  const { token, setToken, resetToken } = useToken();
  const { settings, resetSettings, setSettings } = useSettings();
  //const { offlineStorage, setOfflineStorage } = useOfflineStorage();
  const [theme, setTheme] = useState(defaultTheme);
  const [topics, setTopics] = useState([]);
  const [spaceID, setSpaceID] = useState("");
  const [tags, setTags] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentTopics, setCurrentTopics] = useState([]);
  const [themesObject, setThemesObject] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingFade, setLoadingFade] = useState(true);
  const [loadScreen, setLoadScreen] = useState(true);
  const [topicTitlesList, setTopicTitlesList] = useState([]);

  const _setCurrentCategory = useCallback(
    (categoryName) => {
      if (topics.length > 0) {
        if (categoryName) {
          const selectedCategory = topics.find(
            (c) => c.category === categoryName
          );
          if (selectedCategory) {
            setCurrentCategory({
              id: selectedCategory.id,
              category: selectedCategory.category,
            });
            setCurrentTopics(selectedCategory.topics);
            localStorage.setItem("category", JSON.stringify(categoryName));
          }
        }
      }
    },
    [topics]
  );

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
          setTopicTitlesList(getTopicTitleList(content.topics));
          if (content.topics.length > 0) {
            const currentTopicList = getCurrentTopicsFromCategory(
              content.topics
            );
            setCurrentCategory({
              id: currentTopicList.id,
              category: currentTopicList.category,
            });
            setCurrentTopics(currentTopicList.topics);
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
            if (content.topics.length > 0) {
              getSetTheme(
                settings,
                setTheme,
                setThemesObject,
                resetSettings,
                setSettings
              );
            }
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
            // commenting out until complete
            // getSetTheme(settings, setTheme, setThemesObject);
            // setStates(offlineStorage);
          });
      };
      setContent();
    }
  }, [
    loading,
    // offlineStorage,
    // setOfflineStorage,
    settings,
    resetSettings,
    setSettings,
  ]);

  /*
    contentToAdd = {
      newTags: newTags[],
      newImages: newImages[],
      newSolutions: newSolutions[],
      newTopic: topicToAdd{},
    }
  */
  const addToContentList = useCallback(
    ({ newTags, newSolutions, newTopic }) => {
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
          if (topics[i].category === newTopic.category.category) {
            var newTopicsList = topics;
            newTopicsList[i].topics = [].concat(newTopic, topics[i].topics);
            setTopics(newTopicsList);
            setTopicTitlesList(getTopicTitleList(newTopicsList));
            _setCurrentCategory(newTopic.category.category);
            break;
          }
        }
      }
    },
    [topics, tags, solutions, _setCurrentCategory]
  );
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
              text-decoration: none;
              &:visited {
                color: ${theme.colors.link};
              }
              ${baseTypes.hover} {
                color: ${theme.colors.linkHover};
                text-decoration: underline;
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
                setCurrentCategory={_setCurrentCategory}
                currentCategory={currentCategory}
                tags={tags}
                spaceID={spaceID}
                token={token}
                loading={loading}
                addToContentList={addToContentList}
                setLoading={setLoading}
                themesObject={themesObject}
                solutions={solutions}
                setLoadScreen={setLoadScreen}
                setTheme={setTheme}
                setLoadingFade={setLoadingFade}
                currentTopics={currentTopics}
                topicTitlesList={topicTitlesList}
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
