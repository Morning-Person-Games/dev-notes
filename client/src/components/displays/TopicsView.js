import React from "react";
import { Topic } from "../displays/Topic";

function TopicsView({ topics, tags }) {
  const notFound = (
    <div>
      <h2>No topics found!</h2>
      <p>
        Either content is still loading, or the requested page is not available.
      </p>
    </div>
  );
  if (!topics) {
    return notFound;
  }

  const topicsList = topics.map((topic) => {
    return <Topic key={topic.id} topic={topic} tags={tags} />;
  });
  if (topicsList.length > 0) {
    return <ul>{topicsList}</ul>;
  } else {
    return notFound;
  }
}

export default TopicsView;
