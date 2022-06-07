import React from "react";
import Solution from "./Solution";

function Topic({ topic }) {
  const solutions = topic.solutions.map((solution) => {
    return <Solution key={solution.id} solution={solution} />;
  });
  return (
    <li>
      <h2>{topic.title}</h2>
      {solutions.length > 0 && <ul>{solutions}</ul>}
    </li>
  );
}

export default Topic;
