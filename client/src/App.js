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

function App() {
  const allCategory = { title: "all" };
  const { token, setToken, resetToken } = useToken();
  const [content, setContent] = useState(null);
  const [tags, setTags] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(allCategory);
  const [modalContent, setModalContent] = useState(null);
  //const [solutionCount, setSolutionCount] = useState(null);

  const createModal = function (title, component) {
    if (title === null && component === null) {
      setModalContent(null);
    } else {
      setModalContent({ title, component });
    }
  };

  const addTopicToContentList = function (topicToAdd) {
    //! get correct solution IDs and add them here. (if id === -1)
  };

  // pull and set content list
  useEffect(() => {
    const fetchAndSetTopics = async () => {
      return await fetch("/api/topics")
        .then((res) => {
          return res.json();
        })
        .then((topics) => {
          setContent(topics);
        });
    };
    const fetchAndSetTags = async () => {
      return await fetch("/api/tags")
        .then((res) => {
          return res.json();
        })
        .then((tags) => {
          //console.log(tags);
          setTags(tags);
        });
    };
    fetchAndSetTopics();
    fetchAndSetTags();
  }, []);

  const allTopics = [];
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
      key={allCategory.title}
      path="/"
      element={
        <TopicsView
          topics={allTopics}
          tags={tags}
          currentCategory={allCategory}
          setCurrentCategory={setCurrentCategory}
        />
      }
    />,
  ];
  // add primary page routes from categories
  const categories = [];
  if (content !== null) {
    for (var i = 0; i < content.length; i++) {
      content[i].topics.forEach(function (topic) {
        allTopics.push(topic);
      });
    }

    content.forEach(function (category) {
      var categoryObj = { id: category.id, title: category.category };
      categories.push(categoryObj);
      allRoutes.push(
        <Route
          key={category.id}
          path={category.path}
          element={
            <TopicsView
              tags={tags}
              topics={category.topics}
              currentCategory={categoryObj}
              setCurrentCategory={setCurrentCategory}
            />
          }
        />
      );
    });
  }
  return (
    <BrowserRouter>
      <Modal modalContent={modalContent} setModalContent={setModalContent} />
      <CategoriesHeader content={content} />
      {token ? (
        <TopicEntry
          currentCategory={currentCategory}
          categories={categories}
          createModal={createModal}
          content={content}
          tags={tags}
          setContent={setContent}
          addTopicToContentList={addTopicToContentList}
        />
      ) : (
        <a href="/oauth/authenticate">authenticate</a>
      )}
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
      <Routes>{allRoutes}</Routes>
    </BrowserRouter>
  );
}

export default App;
