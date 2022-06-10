import React, { useEffect } from "react";
import { Topic } from "../fields/Topic";

function TopicsView(props) {
  useEffect(() => {
    props.setCurrentCategory(props.category);
  }, [props]);
  const topics = props.topics.map((topic) => {
    console.log(JSON.stringify(topic, null, 2));
    return <Topic key={topic.id} topic={topic} />;
  });
  return <ul>{topics}</ul>;
}

export default TopicsView;
