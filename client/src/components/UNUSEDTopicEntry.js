import Login from "./components/forms/Login";
function TopicEntry(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
  }
  return <Login />;
}

export default TopicEntry;
