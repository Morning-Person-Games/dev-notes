import React, { useState, useEffect } from "react";
import {
  BsSortAlphaDown,
  BsSortAlphaUp,
  BsSortDownAlt,
  BsSortUpAlt,
} from "react-icons/bs";
import { theme } from "../../globalStyles";
import styled from "@emotion/styled";
function SortOptions({ setTopics }) {
  const [whichSort, setWhichSort] = useState({
    type: "date",
    previous: "date",
    dateReversed: false,
    alphaReversed: false,
  });
  const [sorting, setSorting] = useState(false);
  useEffect(() => {
    if (sorting) {
      if (whichSort.type === whichSort.previous) {
        setTopics((prev) => {
          var reversed = [].concat(prev).reverse();
          return reversed;
        });
      } else {
        if (whichSort.type === "date") {
          setTopics((prev) => {
            var sorted = []
              .concat(prev)
              .sort(
                (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
              );
            return sorted;
          });
        } else {
          // sort alpha
          setTopics((prev) => {
            var alpha = []
              .concat(prev)
              .sort((a, b) => a.title.localeCompare(b.title));
            return alpha;
          });
        }
      }
    }
  }, [whichSort, setTopics, sorting]);
  //styling
  const { baseTypes } = theme;
  const Options = styled.div`
    display: block;
  `;
  const SortBtn = styled.button`
    ${baseTypes.baseBtn};
    display: inline-block;
    background: none;
    &:hover {
      background: none;
    }
  `;

  return (
    <Options>
      <SortBtn
        type="button"
        onClick={() => {
          setWhichSort((prev) => {
            const type = "date";
            return {
              type: type,
              previous: prev.type,
              dateReversed: prev.type === type ? !prev.dateReversed : false,
              alphaReversed: false,
            };
          });
          setSorting(true);
        }}
        active={whichSort.type === "date" ? true : false}
      >
        {whichSort.dateReversed ? <BsSortUpAlt /> : <BsSortDownAlt />}
      </SortBtn>
      <SortBtn
        type="button"
        onClick={() => {
          setWhichSort((prev) => {
            const type = "alpha";
            return {
              type: type,
              previous: prev.type,
              dateReversed: false,
              alphaReversed: prev.type === type ? !prev.alphaReversed : false,
            };
          });
          setSorting(true);
        }}
        active={whichSort.type === "alpha" ? true : false}
      >
        {whichSort.alphaReversed ? <BsSortAlphaUp /> : <BsSortAlphaDown />}
      </SortBtn>
    </Options>
  );
}

export default SortOptions;
