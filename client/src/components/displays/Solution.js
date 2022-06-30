import React, { useRef, useEffect } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Linkify from "linkify-react";
import { theme } from "../../globalStyles";
import { useIsOverflow } from "../tools/useIsOverflow";
import MDEditor from "@uiw/react-md-editor";

function Solution({ solution, expanded, setCanExpand, solutionCount }) {
  const ref = useRef();
  const overflow = useIsOverflow(ref);
  useEffect(() => {
    setCanExpand((prev) => {
      if (prev || (!prev && overflow)) {
        return true;
      }
      return false;
    });
  }, [overflow, setCanExpand]);
  //styling
  const { secondary } = theme.colors;
  const { baseRichText, baseFontSize } = theme.baseTypes;
  const minLines = 2;
  // line height + default padding:
  const defaultLineHeight = baseFontSize * 1.5 + 10 + "px";
  const lines = 6;
  const ell = css`
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${Math.max(lines - solutionCount, minLines)};
  `;
  const eliped = expanded ? "" : ell;
  const Li = styled.li`
    ${baseRichText};
    margin: 0;
    padding: 0 0 14px 0;
    margin-bottom: 0;
    max-width: 99%;
    display: -webkit-box;
    position: relative;
    overflow-wrap: break-word;
    min-height: ${overflow ? "6.5em" : defaultLineHeight};
    ${eliped};
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
    : solution.description;
  return (
    <Li ref={ref}>
      <Linkify>
        <MDEditor.Markdown
          source={renderedSolution}
          style={{ backgroundColor: "transparent" }}
        />
      </Linkify>
      <Cover />
    </Li>
  );
}

export { Solution };
