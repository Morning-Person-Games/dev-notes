import React, { useState } from "react";
import { getTagNameFromID } from "../tools/HelperFunctions";
import styled from "@emotion/styled";
import { theme } from "../../globalStyles";

const Li = styled.li`
  display: inline-block;
`;

const { blue, hoverBlue, inactiveColor, white } = theme.colors;
const { hover } = theme.baseTypes;
// const Button = styled.button`
// color: ${active ? white : inactiveColor};
// font-size: 1em;
// background: ${active ? blue : "none"};
// padding: 5px;
// border: 1px solid ${active ? "transparent" : inactiveColor};
// margin-right: 5px;
// transition: all 50ms ease-in;
// -webkit-transition: all 50ms ease-in;
// ${theme.baseTypes.hover} {
//   border-color: ${active ? "transparent" : white};
//   color: ${!active && white};
//   background: ${active && hoverBlue};
// }
// `;
const Button = styled.button((props) => ({
  color: props.active ? white : inactiveColor,
  fontSize: theme.sizes.font.default,
  background: props.active ? blue : "none",
  padding: "5px",
  border: "1px solid transparent",
  borderColor: props.active ? "transparent" : inactiveColor,
  marginRight: "5px",
  transition: "all 50ms ease-in",
  "&:hover, &:active, &:focus, &:focus-visible:": {
    borderColor: props.active ? "transparent" : white,
    color: !props.active && white,
    background: props.active && hoverBlue,
  },
}));

function Tag({ tag, allTags }) {
  if (!allTags) return;
  const name = getTagNameFromID(tag.id, allTags);
  return <li>{name}</li>;
}

function TagField({ tag, allTags, handleTags }) {
  const [active, setActive] = useState(false);
  if (!allTags) return;
  const name = getTagNameFromID(tag.id, allTags);
  return (
    <Li>
      <Button
        onClick={() => {
          handleTags(tag.id);
          setActive((prevState) => !prevState);
        }}
        active={active}
      >
        {name}
      </Button>
    </Li>
  );
}

export { Tag, TagField };
