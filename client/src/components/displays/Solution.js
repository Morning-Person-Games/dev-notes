import React, { useRef, useEffect } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Linkify from "linkify-react";
import { theme } from "../../globalStyles";
import { useIsOverflow } from "../tools/useIsOverflow";
import MDEditor from "@uiw/react-md-editor";

function Solution({ solution, expanded, setCanExpand, canExpand, count }) {
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
  const { primary, secondary } = theme.colors;
  const { baseRichText } = theme.baseTypes;
  const ell = css`
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    //${Math.max(6 - count, 2)}
  `;
  const eliped = expanded ? "" : ell;
  const Li = styled.li`
    ${baseRichText};
    margin: 0;
    padding: 0 0 14px 0;
    margin-bottom: 0;
    display: -webkit-box;
    position: relative;
    overflow-wrap: break-word;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    a {
      overflow-wrap: anywhere;
    }
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
