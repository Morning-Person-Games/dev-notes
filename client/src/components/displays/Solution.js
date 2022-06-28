import React from "react";
import { css } from "@emotion/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import styled from "@emotion/styled";
import Linkify from "linkify-react";
import { theme } from "../../globalStyles";
import { useIsOverflow } from "../tools/useIsOverflow";

function Solution({ solution, expanded, setCanExpand }) {
  const ref = React.useRef();
  useIsOverflow(ref, setCanExpand);
  //styling
  const { primary, secondary } = theme.colors;
  const { baseRichText } = theme.baseTypes;
  const ell = css`
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
  `;
  const eliped = expanded ? "" : ell;
  const Li = styled.li`
    ${baseRichText};
    margin: 0;
    padding: 0 0 15px 0;
    margin-bottom: 0;
    display: -webkit-box;
    position: relative;
    overflow-wrap: break-word;
    ${eliped};
    &:not(:last-child) {
      padding-bottom: 10px;
      border-bottom: 2px solid ${primary};
    }
  `;
  const Cover = styled.div`
    display: block;
    position: absolute;
    background-color: ${secondary};
    width: 100%;
    height: 10px;
    content: "";
    bottom: 0;
  `;
  const renderedSolution = solution.missing
    ? solution.missing
    : documentToReactComponents(solution.description);
  return (
    <Li ref={ref}>
      <Linkify>{renderedSolution}</Linkify>
      <Cover />
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
