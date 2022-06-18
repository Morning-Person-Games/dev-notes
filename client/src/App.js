import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useToken from "./components/tools/useToken";
import TopicEntry from "./components/forms/TopicEntry";
import TopicsView from "./components/displays/TopicsView";
import CategoriesHeader from "./components/displays/Categories";
import Login from "./components/tools/Login";
import Logout from "./components/tools/Logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Modal from "./components/displays/Modal";
import { idIsUnique } from "./components/tools/HelperFunctions";

function App() {
  const { token, setToken, resetToken } = useToken();
  const [topics, setTopics] = useState([]);
  const [tags, setTags] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({ topics: [] });
  const [modalContent, setModalContent] = useState(null);

  const setTopicsAndCategories = (topicsList) => {
    setTopics(topicsList);
    if (topicsList.length > 0) {
      // TODO if localstorage of preffered order, put order here
      setCurrentCategory(topicsList[0]);
    }
  };

  useEffect(() => {
    // TODO Caching? Optimization? I don't know a lot about API based optimization atm.
    // pull and set content list
    const fetchAndSetContent = async () => {
      return await fetch("/api/content")
        .then((res) => {
          return res.json();
        })
        .then((content) => {
          setTopicsAndCategories(content.topics);
          setTags(content.tags);

          //? It's possible that we dont have to call solutions in api/content and can have a serperate api/solutions as a possible optimization. If that was the case we could just call api/solutions the first time we need it for either getSolutionUniqueID or search
          setSolutions(content.solutions);
          console.log("fetched");
        });
    };
    fetchAndSetContent();
  }, []);

  const createModal = function (title, component) {
    if (title === null && component === null) {
      setModalContent(null);
    } else {
      setModalContent({ title, component });
    }
  };

  // find the first available uniqueID for a new solution:
  const getSolutionUniqueID = () => {
    const idList = [];
    solutions.forEach((solution) => {
      idList.push(solution.id);
    });
    idList.sort(function (a, b) {
      return a - b;
    });
    if (idList.length <= 0) {
      return 0;
    }
    for (let i = 0; i <= idList.length; i++) {
      if (i !== idList[i]) {
        return i;
      }
    }
  };

  /*
    contentToAdd = {
      newTags: newTags[],
      newImages: newImages[],
      newSolutions: newSolutions[],
      newTopic: topicToAdd{},
    }
  */
  const addToContentList = ({ newTags, newSolutions, newTopic }) => {
    console.log(newTags);
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
          newTopicsList[i].topics = topics[i].topics.concat([newTopic]);
          setTopics(newTopicsList);
          setCurrentCategory(newTopicsList[i]);
          break;
        }
      }
    }
  };

  // set initial utility routes
  const allRoutes = [
    <Route
      key={"oauth"}
      path="/oauth/redirect"
      element={<Login setToken={setToken} />}
    />,
    <Route
      key={"logout"}
      path="/logout"
      element={<Logout resetToken={resetToken} />}
    />,
    <Route
      key={"home"}
      path="/"
      element={<TopicsView topics={currentCategory.topics} tags={tags} />}
    />,
    <Route key="wildcard" from="*" element={<TopicsView />} />,
  ];
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Modal modalContent={modalContent} setModalContent={setModalContent} />
      <CategoriesHeader
        topics={topics}
        setCurrentCategory={setCurrentCategory}
      />
      {token ? (
        <TopicEntry
          currentCategory={currentCategory}
          createModal={createModal}
          tags={tags}
          getSolutionUniqueID={getSolutionUniqueID}
          setTopics={setTopics}
          addToContentList={addToContentList}
        />
      ) : (
        <a href="/oauth/authenticate">authenticate</a>
      )}
      <Routes>{allRoutes}</Routes>
    </BrowserRouter>
  );
}

export default App;
