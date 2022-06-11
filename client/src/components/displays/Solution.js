import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

function Solution({ solution }) {
  return <li>{solution.title}</li>;
}

function ExpandedSolution({ solution }) {
  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        // render the EMBEDDED_ASSET as you need
        return (
          <img
            src={`https://${node.data.target.fields.file.url}`}
            height={node.data.target.fields.file.details.image.height}
            width={node.data.target.fields.file.details.image.width}
            alt={node.data.target.fields.description}
          />
        );
      },
    },
  };
  const renderedSolution = documentToReactComponents(
    solution.description,
    renderOptions
  );
  return <li>{renderedSolution}</li>;
}

export { Solution, ExpandedSolution };
