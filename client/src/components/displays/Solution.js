import React, { useRef, useEffect } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { theme } from "../../globalStyles";
import { useIsOverflow } from "../tools/useIsOverflow";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
//styling
const { colors, baseTypes } = theme;
const minLines = 2;
// line height + default padding:
const defaultLineHeight = baseTypes.baseFontSize * 1.5 + 10;
const defaultMaxHeight = defaultLineHeight * 6;
const Li = styled.li`
  ${baseTypes.richText};
  margin: 0;
  padding: 0 0 14px 0;
  margin-bottom: 0;
  max-width: 100%;
  display: -webkit-box;
  position: relative;
  overflow-wrap: break-word;
  min-height: ${(props) =>
    props.overflow ? "6.5em" : defaultLineHeight + "px"};
  max-height: ${(props) => (!props.expanded ? "12em" : "max-content")};
  ${(props) => props.eliped};
`;
const Cover = styled.div`
  display: block;
  position: absolute;
  background-color: ${colors.secondary};
  width: 100%;
  box-shadow: 0 0 1.4em 1.5em
    ${(props) =>
      props.overflow && !props.expanded ? colors.secondary : "transparent"};
  height: 0;
  content: "";
  bottom: 0;
`;

const ErrorP = styled.p`
  color: ${colors.inactiveColor};
`;

function Solution({ solution, expanded, setCanExpand, solutionCount, edit }) {
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

  if (!solution.description || solution.description.length === 0) {
    return (
      <Li>
        <div style={{ width: "100%" }}>
          <ErrorP>
            This topic currently has no solutions, add a solution{" "}
            <a href={edit} target="_blank" rel="noreferrer">
              here
            </a>
            !
          </ErrorP>
        </div>
      </Li>
    );
  }

  return (
    <Li
      ref={ref}
      eliped={eliped}
      expanded={expanded ? 1 : 0}
      overflow={overflow ? 1 : 0}
    >
      <div style={{ width: "100%" }}>
        <ReactMarkdown children={solution.description} remarkPlugins={[gfm]} />
      </div>
      <Cover overflow={overflow ? 1 : 0} expanded={expanded ? 1 : 0} />
    </Li>
  );
}

export { Solution };
