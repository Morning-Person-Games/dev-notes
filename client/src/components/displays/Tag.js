import React from "react";
import { getTagNameFromID } from "../tools/HelperFunctions";

function Tag({ tag, allTags }) {
  if (!allTags) return;
  const name = getTagNameFromID(tag.id, allTags);
  return <li>{name}</li>;
}

export default Tag;
