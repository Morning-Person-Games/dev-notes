import React, { useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { baseTypes, staticSizes, mixins } from "../../styles/globalStyles";
import { useIsOverflow } from "../tools/useIsOverflow";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { useTheme } from "@emotion/react";
import { transparentize } from "polished";
import { BsFiles, BsCheckLg } from "react-icons/bs";

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
    margin: 0 10px 0 0;
    padding: 0.2em 0.5em;
    color: ${(props) => props.theme.colors.codeText};
    line-height: 2;
  }
  pre {
    box-shadow: inset 0 1px 6px -1px ${(props) => transparentize(0.4, props.theme.colors.primary)};
    background-color: ${(props) => props.theme.colors.codeBlock};
    line-height: 1.45;
    margin-top: 10px;
    border-radius: 0;
    color: ${(props) => props.theme.colors.codeText};
    white-space: inherit;
    position: relative;
    ${baseTypes.hover} {
      #ClipButton {
        opacity: 1;
      }
    }
    p {
      padding: 0;
    }
    code {
      display: block;
      overflow: auto;
      line-height: inherit;
      padding: 15px;
      background-color: transparent;
      position: relative;
      margin: 0;
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

const ClipCodeBtn = styled.button`
  transition: opacity 150 ease-in, color 100 ease-in;
  opacity: 0;
  background: none;
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: ${staticSizes.font.xl};
  color: ${(props) => props.theme.colors.white};
  &:hover {
    color: ${(props) => props.theme.colors.highlight};
  }
  svg {
    transition: opacity 150 ease-in, color 100 ease-in;
  }
`;
const SuccessIcon = styled(BsCheckLg)`
  color: ${(props) => props.theme.colors.link};
`;
const ImageLinkText = styled.span`
  position: absolute;
  display: block;
  top: 0;
  ${mixins.transition("opacity", 150)};
  opacity: 0;
  font-size: ${staticSizes.font.sm};
  color: rgb(242, 242, 242);
  box-shadow: 0px 7px 7px -2px rgba(0, 0, 0, 0.8);
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
`;
const SpanWrapper = styled.span`
  display: flex;
  width: 100%;
  justify-content: center;
`;
const ImageA = styled.a`
  margin: 10px -10px 0 -10px;
  display: block;
  position: relative;
  text-align: center;
  //side step P wrapper:
  width: fit-content;
  img {
    max-width: 100%;
    height: auto;
  }
  ${baseTypes.hover} {
    span {
      opacity: 1;
    }
  }
`;

// #endregion

function isImage(url) {
  return /\.(jpg|jpeg|png|gif)$/.test(url);
}

function CopyCodeButton({ children }) {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <ClipCodeBtn
        id="ClipButton"
        onClick={() => {
          navigator.clipboard.writeText(children);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 1000);
        }}
      >
        {copied ? <SuccessIcon /> : <BsFiles />}
      </ClipCodeBtn>
    </>
  );
}

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
          remarkPlugins={[gfm]}
          fullscreen={fullscreen}
          components={{
            code({ node, inline, children, ...props }) {
              return inline ? (
                <p style={{ position: "relative" }}>
                  <code {...props}>{children}</code>
                  <CopyCodeButton children={children} />
                </p>
              ) : (
                <>
                  <code {...props}>{children}</code>
                  <CopyCodeButton children={children} />
                </>
              );
            },
            a({ node, href, children, ...props }) {
              if (isImage(href)) {
                return (
                  <SpanWrapper>
                    <ImageA
                      href={href}
                      {...props}
                      target="__blank"
                      rel="noreferrer"
                      fullscreen={fullscreen}
                    >
                      <ImageLinkText>{href}</ImageLinkText>
                      <img
                        src={href}
                        alt="A URL thats automatically displayed, so no further visual description can be given unfortunately"
                      />
                    </ImageA>
                  </SpanWrapper>
                );
              } else {
                return (
                  <a href={href} {...props} target="__blank" rel="noreferrer">
                    {children}
                  </a>
                );
              }
            },
          }}
        />
      </div>
      {!fullscreen && (
        <Cover overflow={overflow ? 1 : 0} expanded={expanded ? 1 : 0} />
      )}
    </Li>
  );
}

export default Solution;
