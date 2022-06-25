import React from "react";
import { getTagNameFromID } from "../tools/HelperFunctions";

function Tag({ tag, allTags }) {
  if (!allTags) return;
  const name = getTagNameFromID(tag.id, allTags);
  return <li>{name}</li>;
}

function TagField({ tag, allTags, handleTags }) {
  if (!allTags) return;
  const name = getTagNameFromID(tag.id, allTags);
  const handleClick = () => {
    handleTags(tag.id);
  };
  return (
    <li>
      <button onClick={handleClick}>{name}</button>
    </li>
  );
}

export { Tag, TagField };
