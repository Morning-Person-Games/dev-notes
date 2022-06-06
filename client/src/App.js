import React from "react";
import useToken from "./components/useToken";
import TopicEntry from "./components/forms/TopicEntry";
import TopicView from "./components/TopicView";
import LoginForm from "./components/forms/LoginForm";

function App() {
  const { token, setToken } = useToken();
  const [topics, setTopics] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/topics")
      .then((res) => {
        return res.json();
      })
      .then((topics) => {
        //console.log(topics);
        setTopics({ topics });
      });
  }, [setTopics]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Categories Here</h1>
      </header>
      {token ? <TopicEntry /> : <LoginForm setToken={setToken} />}
      <TopicView topics={topics} />
    </div>
  );
}

export default App;

function AddTopic() {}
