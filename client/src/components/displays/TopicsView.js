import React, { useEffect } from "react";
import { Topic } from "../displays/Topic";

function TopicsView(props) {
  useEffect(() => {
    props.setCurrentCategory(props.category);
  }, [props]);
  const topics = props.topics.map((topic) => {
    return <Topic key={topic.id} topic={topic} tags={props.tags} />;
  });
  return <ul>{topics}</ul>;
}

export default TopicsView;
