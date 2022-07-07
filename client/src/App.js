import { React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useToken from "./components/tools/useToken";
import TopicForm from "./components/forms/TopicEntry";
import TopicsView from "./components/displays/TopicsView";
import CategoriesHeader from "./components/displays/Categories";
import { InitConfigForm } from "./components/forms/ConfigForms";
import LoadingDisplay from "./components/displays/Loading";
import Login from "./components/tools/Login";
import Logout from "./components/tools/Logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import styled from "@emotion/styled";
import { theme } from "./globalStyles";

// styling
const { sizes } = theme;
const TopicSection = styled.div`
  display: block;
`;
const MainContent = styled.div`
  ${sizes.colWidth};
  display: block;
`;
const LoginButton = styled.a`
  ${theme.baseTypes.baseBtn};
  width: 100%;
  max-width: ${theme.sizes.mdCol};
  font-size: 2em;
  margin-bottom: 10px;
  padding: 8px 0;
  text-align: center;
  text-decoration: none;
`;
const LoginButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  const { token, setToken, resetToken } = useToken();
  const [topics, setTopics] = useState([]);
  const [spaceID, setSpaceID] = useState("");
  const [tags, setTags] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({ topics: [] });
  const [loading, setLoading] = useState(true);

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
          setSpaceID(content.spaceID);
          console.log("Fetched content");
        });
    };
    fetchAndSetContent();
    setLoading(false);
  }, []);
  // To stop aggresive color changes when setting up default theme we blur the page until loading is complete
  if (loading) {
    return (
      <MainContent>
        <LoadingDisplay />
      </MainContent>
    );
  }

  // if theres no categories, go to initial startup form
  if (!topics || topics.length === 0) {
    return (
      <MainContent>
        <InitConfigForm />
      </MainContent>
    );
  }

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

  // set initial utility routes
  // TODO - optimize
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
        <TopicsView
          currentTopics={currentCategory.topics}
          tags={tags}
          spaceID={spaceID}
          token={token}
          loading={loading}
        ></TopicsView>
      }
    />,
    <Route key="wildcard" from="*" element={<TopicsView />} />,
  ];

  return (
    <BrowserRouter>
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
      <CategoriesHeader
        topics={topics}
        setCurrentCategory={setCurrentCategory}
        activeCategory={currentCategory.category}
      />
      <MainContent>
        {token ? (
          <TopicForm
            token={token}
            currentCategory={currentCategory}
            tags={tags}
            setTopics={setTopics}
            addToContentList={addToContentList}
          />
        ) : (
          <LoginButtonWrapper>
            <LoginButton href="/login">Login</LoginButton>
          </LoginButtonWrapper>
        )}
        <TopicSection>
          <Routes>{allRoutes}</Routes>
        </TopicSection>
      </MainContent>
    </BrowserRouter>
  );
}

export default App;
