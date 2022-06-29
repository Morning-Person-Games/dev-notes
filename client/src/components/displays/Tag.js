import React, { useState } from "react";
import { getTagNameFromID } from "../tools/HelperFunctions";
import styled from "@emotion/styled";
import { theme } from "../../globalStyles";

function Tag({ tag, allTags }) {
  if (!allTags) return;
  const name = getTagNameFromID(tag.id, allTags);
  return <li>{name}</li>;
}

function TagField({ tag, allTags, handleTags }) {
  const [active, setActive] = useState(false);
  if (!allTags) return;
  const name = getTagNameFromID(tag.id, allTags);
  const handleClick = () => {
    handleTags(tag.id);
    setActive((prevState) => !prevState);
  };

  const Li = styled.li`
    display: inline-block;
  `;

  const { blue, hoverBlue, inactiveColor, white } = theme.colors;

  const Button = styled.button`
    color: ${active ? white : inactiveColor};
    font-size: 1em;
    background: ${active ? blue : "none"};
    padding: 5px;
    border: 1px solid ${active ? "transparent" : inactiveColor};
    margin-right: 5px;
    transition: all 50ms ease-in;
    -webkit-transition: all 50ms ease-in;
    &:hover {
      border-color: ${active ? "transparent" : white};
      color: ${!active && white};
      background: ${active && hoverBlue};
    }
  `;

  return (
    <Li>
      <Button onClick={handleClick}>{name}</Button>
    </Li>
  );
}

export { Tag, TagField };
