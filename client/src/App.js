import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useToken from "./components/tools/useToken";
import TopicEntry from "./components/forms/TopicEntry";
import TopicsView from "./components/tools/TopicsView";
import LoginForm from "./components/forms/LoginForm";
import CategoriesHeader from "./components/tools/Categories";

function App() {
  const { token, setToken } = useToken();
  const [content, setContent] = React.useState(null);
  //const [category, setCategory] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/topics")
      .then((res) => {
        return res.json();
      })
      .then((topics) => {
        //console.log(topics);
        setContent(topics);
      });
  }, [setContent]);

  const allTopics = [];
  const categoryRoutes = [
    <Route key={"all"} path="/" element={<TopicsView topics={allTopics} />} />,
  ];
  //const categories = [];
  if (content !== null) {
    for (var i = 0; i < content.length; i++) {
      content[i].topics.forEach(function (topic) {
        allTopics.push(topic);
      });
    }

    content.forEach(function (category) {
      categoryRoutes.push(
        <Route
          key={category.id}
          path={category.path}
          element={<TopicsView topics={category.topics} />}
        />
      );
    });
  }
  return (
    <BrowserRouter>
      <CategoriesHeader content={content} />
      {token ? <TopicEntry /> : <LoginForm setToken={setToken} />}
      <Routes>{categoryRoutes}</Routes>
    </BrowserRouter>
  );
}

export default App;
