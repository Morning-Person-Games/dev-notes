import { React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useToken from "./components/tools/useToken";
import Notes from "./components/routes/Notes";
import TopicsView from "./components/displays/TopicsView";
import LoadingDisplay from "./components/displays/Loading";
import Login from "./components/routes/Login";
import Logout from "./components/routes/Logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { globals, theme } from "./styles/globalStyles";
import { formatThemesList } from "./styles/themeSelection";

function App() {
  const { token, setToken, resetToken } = useToken();
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
      {globals}
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
        {/* <Route key={"settings"} path="/settings" element={<Settings />} /> */}
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
    </BrowserRouter>
  );
}

export default App;
