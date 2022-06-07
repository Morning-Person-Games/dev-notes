import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

function Solution({ solution }) {
  const renderedSolution = documentToReactComponents(solution.description);
  return <li>{renderedSolution}</li>;
}

export default Solution;
