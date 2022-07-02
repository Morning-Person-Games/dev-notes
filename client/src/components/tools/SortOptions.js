import React, { useEffect } from "react";
import {
  BsSortAlphaDown,
  BsSortAlphaUp,
  BsSortDownAlt,
  BsSortUpAlt,
} from "react-icons/bs";
import { theme } from "../../globalStyles";
import styled from "@emotion/styled";
function SortOptions({
  topics,
  setTopics,
  whichSort,
  setWhichSort,
  sorting,
  setSorting,
}) {
  useEffect(() => {
    if (sorting) {
      if (whichSort.type === whichSort.previous) {
        var reversed = [].concat(topics).reverse();
        setTopics(reversed);
      } else {
        if (whichSort.type === "date") {
          var sorted = []
            .concat(topics)
            .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
          setTopics(sorted);
        } else {
          // sort alpha
          var alpha = []
            .concat(topics)
            .sort((a, b) => a.title.localeCompare(b.title));
          setTopics(alpha);
        }
      }
      setSorting(false);
    }
  }, [whichSort, topics, setTopics, sorting, setSorting]);
  //styling
  const { baseTypes, sizes, colors } = theme;
  const Options = styled.div`
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
  `;
  const SortBtn = styled.button`
    ${baseTypes.baseControl};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${sizes.font.xxl};
    padding: 0;
    background-color: ${(props) =>
      props.active ? colors.highlight : colors.secondary};
    color: ${(props) => (props.active ? colors.white : colors.inactiveColor)};
    ${baseTypes.hover} {
      background-color: ${(props) =>
        props.active ? colors.highlightHover : colors.primary};
    }
    margin-left: 10px;
    width: 1.5em;
  `;

  const DateIcon = whichSort.dateReversed ? <BsSortUpAlt /> : <BsSortDownAlt />;
  const AlphaIcon = whichSort.alphaReversed ? (
    <BsSortAlphaUp />
  ) : (
    <BsSortAlphaDown />
  );
  return (
    <Options>
      <SortBtn
        type="button"
        onClick={() => {
          setWhichSort((prevState) => {
            const type = "date";
            var prev = {};
            prev.previous = prevState.type;
            prev.dateReversed =
              prevState.type === type ? !prevState.dateReversed : false;
            prev.type = type;
            prev.alphaReversed = false;
            return prev;
          });
          setSorting(true);
        }}
        active={whichSort.type === "date" ? true : false}
      >
        {DateIcon}
      </SortBtn>
      <SortBtn
        type="button"
        onClick={() => {
          setWhichSort((prevState) => {
            const type = "alpha";
            var prev = {};
            prev.previous = prevState.type;
            prev.alphaReversed =
              prevState.type === type ? !prevState.alphaReversed : false;
            prev.type = type;
            prev.dateReversed = false;
            return prev;
          });
          setSorting(true);
        }}
        active={whichSort.type === "alpha" ? true : false}
      >
        {AlphaIcon}
      </SortBtn>
    </Options>
  );
}

export default SortOptions;
