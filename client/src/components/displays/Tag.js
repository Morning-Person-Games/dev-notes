import React, { useState } from "react";
import { getTagNameFromID } from "../tools/helperFunctions";
import styled from "@emotion/styled";
import { staticSizes } from "../../styles/globalStyles";

const Li = styled.li`
  display: inline-block;
`;
const Button = styled.button`
  font-size: ${staticSizes.font.md};
  padding: 8px 10px;
  margin-right: 10px;
  color: ${(props) =>
    props.active ? props.theme.colors.white : props.theme.colors.placeholder};
  background-color: ${(props) =>
    props.active ? props.theme.colors.highlight : "transparent"};
  border: 1px solid transparent;
  border-color: ${(props) => !props.active && props.theme.colors.inactiveColor};
  &:hover {
    background-color: ${(props) =>
      props.active && props.theme.colors.highlightHover};
    border-color: ${(props) => !props.active && props.theme.colors.link};
    color: ${(props) => !props.active && props.theme.colors.link};
  }
`;

const TagSpan = styled.span`
  font-size: ${(props) =>
    props.fullscreen ? staticSizes.font.md : staticSizes.font.sm};
  color: ${(props) =>
    props.fullscreen
      ? props.theme.colors.placeholder
      : props.theme.colors.placeholder};
  font-weight: 600;
  padding: ${(props) => props.fullscreen && "4px 10px 5px 10px"};
  margin: 0;
  margin-right: ${(props) => props.fullscreen && "5px"};
  border-radius: 3px;
  background-color: ${(props) =>
    props.fullscreen && props.theme.colors.secondary};
`;

function TagString({ tagged, allTags, fullscreen }) {
  if (!allTags) return;
  return (
    <>
      {tagged.map((tag, index) => (
        <TagSpan key={index} fullscreen={fullscreen}>
          {getTagNameFromID(tag.id, allTags)}
          {!fullscreen && index < tagged.length - 1 && ","}
        </TagSpan>
      ))}
    </>
  );
}

function TagField({ tag, allTags, handleTags }) {
  const [active, setActive] = useState(false);
  if (!allTags) return;
  const name = getTagNameFromID(tag.id, allTags);
  return (
    <Li>
      <Button
        onClick={() => {
          handleTags(tag.id, !active);
          setActive((prevState) => !prevState);
        }}
        active={active}
      >
        {name}
      </Button>
    </Li>
  );
}

export { TagString, TagField };
