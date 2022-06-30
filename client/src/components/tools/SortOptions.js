import React from "react";
import {
  BsSortAlphaDown,
  BsSortAlphaUp,
  BsSortDownAlt,
  BsSortUpAlt,
} from "react-icons/bs";
import { theme } from "../../globalStyles";
import styled from "@emotion/styled";
function SortOptions({
  setSortAlphaReverse,
  setSortDateReverse,
  sortDateReverse,
  sortAlphaReverse,
}) {
  //styling
  const { baseTypes } = theme;
  const Options = styled.div`
    display: block;
  `;
  const SortBtn = styled.button`
    ${baseTypes.baseBtn};
    display: inline-block;
  `;

  const handleClick = (e) => {
    const id = e.target.name;
    console.log(e.target.name);
    if (id === "date") {
      setSortDateReverse((prev) => {
        if (prev === null) {
          console.log("null");
          return false;
        } else {
          console.log("toggle");
          return !prev;
        }
      });
      setSortAlphaReverse(null);
    } else {
      setSortAlphaReverse((prev) => {
        if (prev === null) {
          return false;
        } else {
          return !prev;
        }
      });
      setSortDateReverse(null);
    }
  };
  return (
    <Options>
      <SortBtn name="date" type="button" onClick={handleClick}>
        {sortDateReverse ? <BsSortUpAlt /> : <BsSortDownAlt />}
      </SortBtn>
      <SortBtn name="alpha" type="button" onClick={handleClick}>
        {sortAlphaReverse ? <BsSortAlphaUp /> : <BsSortAlphaDown />}
      </SortBtn>
    </Options>
  );
}

export default SortOptions;
