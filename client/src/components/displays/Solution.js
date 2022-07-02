import React, { useRef, useEffect } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { theme } from "../../globalStyles";
import { useIsOverflow } from "../tools/useIsOverflow";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

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
  const defaultLineHeight = baseFontSize * 1.5 + 10;
  const defaultMaxHeight = defaultLineHeight * 6;
  const pickyTooTall =
    overflow &&
    ref.current &&
    ref.current.clientHeight > defaultMaxHeight + defaultLineHeight
      ? true
      : false;
  const lines = pickyTooTall ? 5 : 6;
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
    max-width: 100%;
    display: -webkit-box;
    position: relative;
    overflow-wrap: break-word;
    min-height: ${overflow ? "6.5em" : defaultLineHeight + "px"};
    ${eliped};
  `;
  const Cover = styled.div`
    display: block;
    position: absolute;
    background-color: ${secondary};
    width: 100%;
    box-shadow: 0 0 1.4em 1.5em ${overflow ? secondary : "transparent"};
    height: 0;
    content: "";
    bottom: 0;
  `;
  const renderedSolution = solution.missing
    ? solution.missing
    : solution.description;
  return (
    <Li ref={ref}>
      <div style={{ width: "100%" }}>
        <ReactMarkdown children={renderedSolution} remarkPlugins={[gfm]} />
      </div>
      <Cover />
    </Li>
  );
}

export { Solution };
