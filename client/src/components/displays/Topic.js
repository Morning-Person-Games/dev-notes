import React from "react";
import { ExpandedSolution } from "./Solution";

function Topic({ topic }) {
  // ! remember to switch back to non expanded solution:
  const solutions = topic.solutions.map((solution) => {
    return <ExpandedSolution key={solution.id} solution={solution} />;
  });
  return (
    <li>
      <h2>{topic.title}</h2>
      {solutions.length > 0 && <ul>{solutions}</ul>}
    </li>
  );
}

function TopicExpanded({ topic }) {}

export { Topic, TopicExpanded };
