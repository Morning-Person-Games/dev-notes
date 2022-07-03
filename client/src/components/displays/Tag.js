import React, { useState } from "react";
import { getTagNameFromID } from "../tools/HelperFunctions";
import styled from "@emotion/styled";
import { theme } from "../../globalStyles";

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
  ${theme.baseTypes.hover} {
    border-color: ${(props) => !props.active && colors.link};
    color: ${(props) => !props.active && colors.link};
  }
`;
// const Button = styled.button((props) => ({
//   color: props.active ? white : inactiveColor,
//   fontSize: theme.sizes.font.default,
//   background: props.active ? blue : "none",
//   padding: "5px",
//   border: "1px solid transparent",
//   borderColor: props.active ? "transparent" : inactiveColor,
//   marginRight: "5px",
//   "&:hover, &:active, &:focus, &:focus-visible:": {
//     borderColor: props.active ? "transparent" : white,
//     color: !props.active && white,
//     background: props.active && hoverBlue,
//   },
// }));

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

export { Tag, TagField };
