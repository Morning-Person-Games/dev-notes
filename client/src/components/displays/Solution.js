import React, { useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { baseTypes, staticSizes, mixins } from "../../styles/globalStyles";
import { useIsOverflow } from "../tools/useIsOverflow";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import remarkImages from "remark-images";
import remarkUnwrapImages from "remark-unwrap-images";
import { useTheme } from "@emotion/react";
import { transparentize } from "polished";

// BsFillStickiesFill
//BsBack
//BsFiles
//BsFront
//BsUnion

// #region styling
const minLines = 2;
// line height + default padding:
const defaultLineHeight = (baseSize) => baseSize * 1.5 + 10;
const defaultMaxHeight = (baseSize) => defaultLineHeight(baseSize) * 6;
const Li = styled.li`
  margin: 0;
  padding: ${(props) => (props.fullscreen ? "0 20px 14px 20px" : "0 0 14px 0")};
  margin-bottom: 0;
  max-width: 100%;
  display: -webkit-box;
  position: relative;
  overflow-wrap: break-word;
  min-height: ${(props) =>
    props.overflow
      ? "6.5em"
      : defaultLineHeight(props.theme.baseFontSize) + "px"};
  max-height: ${(props) =>
    !props.expanded && !props.fullscreen ? "12em" : "max-content"};
  ${(props) =>
    props.eliped &&
    !props.fullscreen &&
    `overflow: hidden; 
  text-overflow: ellipsis; 
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ` +
      Math.max(props.lines - props.solutionCount, minLines) +
      ";"};
  word-wrap: break-word;
  p {
    margin: 0;
    ${staticSizes.rtPadding};
  }
  font-size: 0.9rem;
  p {
    font-size: 1.1em;
  }
  h1,
  h2 {
    border: 0;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.2em;
    margin: 0;
    font-weight: 700;
    ${staticSizes.rtPadding};
  }
  img {
    padding-top: 10px;
    width: 100%;
  }
  a.anchor {
    margin-left: -27px;
  }
  ul {
    list-style-type: disc;
    padding-top: 0;
  }
  li {
    padding-top: 10px;
  }
  pre {
    margin: 10px 0 0 0;
  }
  hr {
    border: none;
    height: 3px;
    margin: 1em 0;
    background-color: ${(props) =>
      props.fullscreen
        ? props.theme.colors.secondary
        : props.theme.colors.primary};
  }
  code {
    background-color: ${(props) => props.theme.colors.codeLine};
    border-radius: 6px;
    margin: 0;
    padding: 0.2em 0.4em;
    color: ${(props) => props.theme.colors.codeText};
  }
  pre {
    box-shadow: inset 0 1px 6px -1px ${(props) => transparentize(0.4, props.theme.colors.primary)};
    background-color: ${(props) => props.theme.colors.codeBlock};
    line-height: 1.45;
    margin-top: 10px;
    border-radius: 0;
    color: ${(props) => props.theme.colors.codeText};
    code {
      display: block;
      overflow: auto;
      padding: 15px;
      background-color: transparent;
    }
  }
  a {
    overflow-wrap: anywhere;
    ${mixins.transition()};
    color: ${(props) => props.theme.colors.link};
    &:visited {
      color: ${(props) => props.theme.colors.link};
    }
    ${baseTypes.hover} {
      color: ${(props) => props.theme.colors.linkHover};
    }
  }
  &:not(:last-child) {
    padding-bottom: 10px;
    border-bottom: 2px solid
      ${(props) =>
        props.fullscreen
          ? props.theme.colors.secondary
          : props.theme.colors.primary};
  }
`;

const Cover = styled.div`
  display: ${(props) => props.fullscreen};
  position: absolute;
  background-color: ${(props) => props.theme.colors.secondary};
  width: 100%;
  box-shadow: 0 0 1.4em 1.5em
    ${(props) =>
      props.overflow && !props.expanded
        ? props.theme.colors.secondary
        : "transparent"};
  height: 0;
  content: "";
  bottom: 0;
`;

const ErrorP = styled.p`
  color: ${(props) => props.theme.colors.inactiveColor};
`;

// #endregion

function Solution({
  solution,
  expanded,
  setCanExpand,
  solutionCount,
  edit,
  fullscreen,
}) {
  // #region vars
  const ref = useRef();
  const overflow = useIsOverflow(ref);
  const theme = useTheme();
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
    ref.current.clientHeight >
      defaultMaxHeight(theme.baseFontSize) +
        defaultLineHeight(theme.baseFontSize)
      ? true
      : false;
  const lines = pickyTooTall ? 5 : 6;
  const eliped = expanded ? 0 : 1;
  // #endregion

  if (!solution.description || solution.description.length === 0) {
    return (
      <Li fullscreen={fullscreen}>
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
      lines={lines}
      solutionCount={solutionCount}
      fullscreen={fullscreen}
    >
      <div style={{ width: "100%", display: "block" }}>
        <ReactMarkdown
          children={solution.description}
          remarkPlugins={[gfm, remarkImages, remarkUnwrapImages]}
        />
      </div>
      {!fullscreen && (
        <Cover overflow={overflow ? 1 : 0} expanded={expanded ? 1 : 0} />
      )}
    </Li>
  );
}

export default Solution;
