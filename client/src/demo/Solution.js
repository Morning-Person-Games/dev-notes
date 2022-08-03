import React, { useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { baseTypes, staticSizes, mixins } from "../styles/globalStyles";
import { useIsOverflow } from "../components/tools/useIsOverflow";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { useTheme } from "@emotion/react";
import { transparentize } from "polished";
import { BsCheck2Square, BsJournalText } from "react-icons/bs";
import { IoCopy } from "react-icons/io5";

// #region styling
const minLines = 1;
// line height + default padding:
const defaultLineHeight = (baseSize) => baseSize * 1.5 + 10;
const defaultMaxHeight = (baseSize) => defaultLineHeight(baseSize) * 6;
const Li = styled.li`
  ${mixins.transition("all", 300)};
  margin: ${(props) => (props.fullscreen ? "10px 0 0 0" : 0)};
  padding: ${(props) => (props.fullscreen ? "0 20px 10px 20px" : "0 0 10px 0")};
  margin-bottom: 0;
  max-width: 100%;
  display: ${(props) => (props.fullscreen ? "flex" : "-webkit-box")};
  position: relative;
  overflow-wrap: break-word;
  min-height: ${(props) =>
    props.overflow
      ? "5.5em"
      : defaultLineHeight(props.theme.sizes.baseFontSize) + "px"};
  max-height: ${(props) =>
    !props.expanded && !props.fullscreen ? "8em" : "max-content"};
  ${(props) =>
    props.eliped &&
    !props.fullscreen &&
    `overflow: hidden; 
  text-overflow: ellipsis; 
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ` +
      Math.max(props.lines - props.solutionCount * 2, minLines) +
      ";"};
  word-wrap: break-word;
  &:not(:last-child) {
    padding-bottom: 10px;
    border-bottom: 3px solid
      ${(props) =>
        !props.fullscreen
          ? props.theme.colors.primary
          : props.theme.colors.secondary};
  }
  // #region richtext
  p {
    margin: 0;
    overflow-wrap: anywhere;
    ${staticSizes.rtPadding};
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
    overflow-wrap: anywhere;
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
    margin: 0 1px 0 0;
    padding: 2px 6px;
    color: ${(props) => props.theme.colors.codeText};
    line-height: 2;
  }
  pre {
    padding: 3px;
    box-shadow: inset 0 0 5px 1px
      ${(props) => transparentize(0.4, props.theme.colors.primary)};
    background-color: ${(props) => props.theme.colors.codeBlock};
    line-height: 1.45;
    margin: 10px 0 0 0;
    border-radius: 0;
    color: ${(props) => props.theme.colors.codeText};
    overflow-x: auto;
    display: grid;
    position: relative;
    #ClipButton {
      font-size: ${staticSizes.font.xl};
      svg {
        color: ${(props) => props.theme.colors.highlight};
        &:hover {
          color: ${(props) => props.theme.colors.highlightHover};
        }
      }
    }
    &:hover {
      #ClipButton {
        svg {
          opacity: 1;
        }
      }
    }
    p {
      padding: 0;
    }
    code {
      display: block;
      overflow: auto;
      line-height: inherit;
      padding: 8px 12px;
      background-color: transparent;
      position: relative;
      margin: 0;
    }
  }
  a {
    ${mixins.transition()};
    color: ${(props) => props.theme.colors.link};
    &:visited {
      color: ${(props) => props.theme.colors.link};
    }
    ${baseTypes.hover} {
      color: ${(props) => props.theme.colors.linkHover};
    }
  }
  // #endregion
`;

const SolutionIcon = styled(BsJournalText)`
  margin-top: 12px;
  font-size: ${staticSizes.font.lg};
`;

const SolutionWrapper = styled.div`
  display: block;
  width: 100%;
  padding-left: ${(props) => props.fullscreen && "10px"};
`;

const Cover = styled.div`
  display: ${(props) => props.fullscreen};
  position: absolute;
  background-color: ${(props) => props.theme.colors.secondary};
  width: 100%;
  box-shadow: 0 0 10px 10px
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
  background: none;
  padding: 0;
  position: ${(props) => (props.pre ? "absolute" : "relative")};
  top: ${(props) => props.pre && "10px"};
  right: ${(props) => props.pre && "8px"};
  text-align: inherit;
  font-size: ${staticSizes.font.sm};
  svg {
    ${mixins.transition()};
    position: absolute;
    opacity: 0;
    right: -4px;
    top: -6px;
    font-size: ${staticSizes.font.lg};
  }
  &:hover {
    svg {
      opacity: 1;
    }
  }
`;
const SuccessIcon = styled(BsCheck2Square)`
  color: ${(props) => props.theme.colors.highlight};
`;
const CopyIcon = styled(IoCopy)`
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

function CopyCodeButton({ children, pre, copyText, ...props }) {
  const [copied, setCopied] = useState(false);
  return (
    <ClipCodeBtn
      id="ClipButton"
      onClick={() => {
        navigator.clipboard.writeText(copyText);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      }}
      pre={pre}
      {...props}
    >
      {children}
      {copied ? <SuccessIcon /> : <CopyIcon />}
    </ClipCodeBtn>
  );
}

function Solution({
  solution,
  expanded,
  setCanExpand,
  solutionCount,
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
      {fullscreen && <SolutionIcon />}
      <SolutionWrapper fullscreen={fullscreen}>
        {!solution.description || solution.description.length === 0 ? (
          <ErrorP>
            This topic currently has no solutions. If this wasn't a demo, this
            would link to the edit page here.
          </ErrorP>
        ) : (
          <ReactMarkdown
            children={solution.description}
            remarkPlugins={[gfm]}
            fullscreen={fullscreen}
            components={{
              code({ node, inline, children, ...props }) {
                return inline ? (
                  <CopyCodeButton copyText={children} {...props}>
                    <code>{children}</code>
                  </CopyCodeButton>
                ) : (
                  <>
                    <code {...props}>{children}</code>
                    <CopyCodeButton pre={true} copyText={children} {...props} />
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
        )}
      </SolutionWrapper>
      {!fullscreen && (
        <Cover overflow={overflow ? 1 : 0} expanded={expanded ? 1 : 0} />
      )}
    </Li>
  );
}

export default Solution;
