import React, { useState } from "react";
import { getTagNameFromID } from "../tools/HelperFunctions";
import styled from "@emotion/styled";
import { theme } from "../../styles/globalStyles";

const { baseTypes, colors, sizes } = theme;
const Li = styled.li`
  display: inline-block;
`;
const Button = styled.button`
  ${baseTypes.clickable};
  font-size: ${sizes.font.md};
  padding: 8px 10px;
  margin-right: 10px;
  color: ${(props) => (props.active ? colors.white : colors.placeholder)};
  background-color: ${(props) =>
    props.active ? colors.highlight : "transparent"};
  border: 1px solid transparent;
  border-color: ${(props) => !props.active && colors.inactiveColor};
  &:hover {
    background-color: ${(props) => props.active && colors.highlightHover};
    border-color: ${(props) => !props.active && colors.link};
    color: ${(props) => !props.active && colors.link};
  }
`;
const TagP = styled.p`
  font-size: ${sizes.font.sm};
  padding: 0 5px 0 0;
  margin: 0;
  color: ${colors.placeholder};
  font-weight: 600;
`;

function TagString({ tagged, allTags }) {
  if (!allTags) return;
  let tagString = "";
  for (let i = 0; i < tagged.length; i++) {
    const tag = tagged[i];
    const name = getTagNameFromID(tag.id, allTags);
    if (i === 0) {
      tagString += name;
    } else {
      tagString += ", " + name;
    }
  }
  return <TagP>{tagString}</TagP>;
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
