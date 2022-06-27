import { React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useToken from "./components/tools/useToken";
import SimpleTopicForm from "./components/forms/SimpleTopicEntry";
import TopicsView from "./components/displays/TopicsView";
import CategoriesHeader from "./components/displays/Categories";
import Login from "./components/tools/Login";
import Logout from "./components/tools/Logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Modal from "./components/displays/Modal";
import styled from "@emotion/styled";
import { globals, theme } from "./globalStyles";

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
          console.log("Content fetched");
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
      key={"login"}
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
      element={
        <TopicsView currentTopics={currentCategory.topics} tags={tags} />
      }
    />,
    <Route key="wildcard" from="*" element={<TopicsView />} />,
  ];

  // styling
  const { colWidth } = theme.sizes;

  const InputSection = styled.div`
    display: block;
    ${colWidth};
  `;

  const TopicSection = styled.div`
    display: block;
    ${colWidth};
  `;
  const MainContent = styled.div`
    display: flex;
    column-gap: 10px;
    flex-flow: column wrap;
    justify-contnent: flex-start;
    margin: 0 10px;
  `;
  const LoginButton = styled.a`
    ${theme.baseTypes.baseBtn};
    ${theme.sizes.colWidth};
    margin-bottom: 10px;
  `;
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
      <Modal modalContent={modalContent} setModalContent={setModalContent} />
      <CategoriesHeader
        topics={topics}
        setCurrentCategory={setCurrentCategory}
        activeCategory={currentCategory.category}
      />
      <MainContent>
        <InputSection>
          {token ? (
            <SimpleTopicForm
              token={token}
              currentCategory={currentCategory}
              createModal={createModal}
              tags={tags}
              getSolutionUniqueID={getSolutionUniqueID}
              setTopics={setTopics}
              addToContentList={addToContentList}
            />
          ) : (
            <LoginButton href="/login">Login</LoginButton>
          )}
        </InputSection>
        <TopicSection>
          <Routes>{allRoutes}</Routes>
        </TopicSection>
      </MainContent>
    </BrowserRouter>
  );
}

export default App;
