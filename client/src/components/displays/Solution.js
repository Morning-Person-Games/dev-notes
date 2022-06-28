import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import styled from "@emotion/styled";
import Linkify from "linkify-react";
import { ellipsis } from "polished";
import { theme } from "../../globalStyles";

function Solution({ solution, expanded }) {
  //styling
  const { smColText } = theme.sizes;
  const { primary } = theme.colors;
  const { baseRichText } = theme.baseTypes;
  const eliped = expanded
    ? `overflow-wrap: break-word;`
    : ellipsis(smColText, 6);
  const Li = styled.li`
    ${baseRichText};
    margin: 0;
    padding: 0;
    padding-bottom: 12px;
    margin-bottom: 0;
    position: relative;
    ${eliped};
    &:not(:last-child) {
      padding-bottom: 10px;
      border-bottom: 2px solid ${primary};
    }
  `;
  const renderedSolution = documentToReactComponents(solution.description);
  return (
    <Li>
      <Linkify>{renderedSolution}</Linkify>
    </Li>
  );
}

function ExpandedSolution({ solution }) {
  // check for images. Then check If its a temp image or and contentful that can be rendered through documentToReactComponents()
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
