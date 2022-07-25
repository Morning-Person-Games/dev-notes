///** @jsxImportSource @emotion/react */
import { useState, useEffect, useCallback } from "react";
import { css } from "@emotion/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from "./demo/Notes";
import Topics from "./components/displays/Topics";
import LoadingDisplay from "./components/displays/Loading";
import { ToastContainer } from "react-toastify";
import { staticSizes, mixins, baseTypes } from "./styles/globalStyles";
import "react-toastify/dist/ReactToastify.min.css";
import { formatThemesList } from "./styles/themeHelper";
import { getFontStyles } from "./styles/fonts";
import { ThemeProvider, Global } from "@emotion/react";
import defaultColors from "./styles/defaultColors";
import defaultSizes from "./styles/defaultSizes";
import themes from "./demo/themes";

const defaultTheme = {
  colors: defaultColors,
  font: getFontStyles("System Default"),
  sizes: defaultSizes,
  fontName: "System Default",
};

function DemoApp() {
  const [theme, setTheme] = useState(defaultTheme);
  const [topics, setTopics] = useState([]);
  const [tags, setTags] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({ topics: [] });
  const [currentTopics, setCurrentTopics] = useState([]);
  const [themesObject, setThemesObject] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingFade, setLoadingFade] = useState(true);
  const [loadScreen, setLoadScreen] = useState(true);

  useEffect(() => {
    if (loading) {
      const themesFormated = formatThemesList(themes);
      setThemesObject(themesFormated);
      if (currentCategory.topics.length === 0 && topics.length > 0) {
        setCurrentCategory(topics[0]);
      }
      setTimeout(() => {
        setLoadingFade(false);
      }, 1200);
      setLoading(false);
    }
  }, [loading, currentCategory, topics]);

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
          if (topics[i].id === newTopic.category.id) {
            var newTopicsList = topics;
            newTopicsList[i].topics = [].concat(newTopic, topics[i].topics);
            setTopics(newTopicsList);
            setCurrentCategory(newTopicsList[i]);
            setCurrentTopics(newTopicsList[i].topics);
            break;
          }
        }
      }
    },
    [topics, tags, solutions]
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
            key={"home"}
            path="/"
            element={
              <Notes
                topics={topics}
                setCurrentCategory={setCurrentCategory}
                currentCategory={currentCategory}
                currentTopics={currentTopics}
                tags={tags}
                loading={loading}
                setTopics={setTopics}
                addToContentList={addToContentList}
                setLoading={setLoading}
                themesObject={themesObject}
                solutions={solutions}
                setLoadScreen={setLoadScreen}
                setTheme={setTheme}
                setLoadingFade={setLoadingFade}
                currentTheme={theme}
              />
            }
          />
          <Route key="wildcard" from="*" element={<Topics />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default DemoApp;
