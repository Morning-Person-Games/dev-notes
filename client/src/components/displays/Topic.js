import React from "react";
import { Solution } from "./Solution";
import Tag from "./Tag";

function Topic(props) {
  const solutions = props.topic.solutions.map((solution) => {
    return <Solution key={solution.id} solution={solution} />;
  });
  const tags = props.topic.tags.map((tag) => {
    return <Tag key={tag.id} tag={tag} allTags={props.tags} />;
  });
  return (
    <li>
      <h2>{props.topic.title}</h2>
      {tags.length > 0 && <ul>{tags}</ul>}
      {solutions.length > 0 && <ul>{solutions}</ul>}
    </li>
  );
}

function TopicExpanded({ topic }) {}

export { Topic, TopicExpanded };
