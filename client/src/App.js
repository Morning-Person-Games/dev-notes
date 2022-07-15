///** @jsxImportSource @emotion/react */
import { React, useState, useEffect } from "react";
import { css } from "@emotion/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useToken from "./components/tools/useToken";
import Notes from "./components/routes/Notes";
import TopicsView from "./components/displays/TopicsView";
import LoadingDisplay from "./components/displays/Loading";
import Login from "./components/routes/Login";
import Logout from "./components/routes/Logout";
import { ToastContainer } from "react-toastify";
import { staticSizes, mixins, baseTypes } from "./styles/globalStyles";
import "react-toastify/dist/ReactToastify.min.css";
import {
  formatThemesList,
  getThemeSizes,
  getColorsFromTheme,
} from "./styles/themeHelper";
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

function App() {
  const { token, setToken, resetToken } = useToken();
  const { settings } = useSettings();
  const [theme, setTheme] = useState(defaultTheme);
  const [topics, setTopics] = useState([]);
  const [spaceID, setSpaceID] = useState("");
  const [tags, setTags] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({ topics: [] });
  const [themesObject, setThemesObject] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadScreen, setLoadScreen] = useState(true);

  const setTopicsAndCategories = (topicsList) => {
    setTopics(topicsList);
    if (topicsList.length > 0) {
      setCurrentCategory(topicsList[0]);
    }
  };

  useEffect(() => {
    const newTheme = {};
    newTheme.colors = getColorsFromTheme(settings.theme);
    newTheme.font = getFontStyles(settings.font);
    newTheme.sizes = getThemeSizes(settings.textSize);
    setTheme(newTheme);
  }, [settings]);

  useEffect(() => {
    // TODO Caching? Optimization? I don't know a lot about API based optimization atm.
    // pull and set content list
    if (loading) {
      setLoadScreen(true);
      const fetchAndSetContent = async () => {
        return await fetch("/api/content")
          .then((res) => {
            return res.json();
          })
          .then((content) => {
            setTopicsAndCategories(content.topics);
            setTags(content.tags);
            setSolutions(content.solutions);
            setThemesObject(formatThemesList(content.themes));
            setSpaceID(content.spaceID);
            console.log("Fetched content");
            setLoading(false);
            setTimeout(() => setLoadScreen(false), 600);
          });
      };
      fetchAndSetContent();
    }
  }, [loading]);

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
      var newTagsList = tags.concat(newTags);
      setTags(newTagsList);
    }
    if (newSolutions.length > 0) {
      var newSolutionsList = solutions.concat(newSolutions);
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
              font-size: 100%;
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
              &:link {
                color: ${theme.colors.link};
              }
              &:visited {
                color: ${theme.colors.link};
              }
              ${baseTypes.hover} {
                color: ${theme.colors.linkHover};
              }
              font-family: inherit;
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
          toastStyle={{ backgroundColor: theme.colors.primary }}
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
        {loadScreen && <LoadingDisplay loading={loading} />}
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
              />
            }
          />
          <Route key="wildcard" from="*" element={<TopicsView />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
