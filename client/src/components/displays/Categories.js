/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { theme } from "../../globalStyles";
import ScrollContainer from "react-indiana-drag-scroll";

function CategoriesHeader({ topics, setCurrentCategory, activeCategory }) {
  const { highlight, white, highlightHover } = theme.colors;
  const ScrollCon = css`
    ${theme.sizes.colWidth};
    margin-bottom: 10px;
  `;
  const Ul = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    white-space: nowrap;
    width: fit-content;
    margin: 5px 0 3px 0;
  `;
  const Li = styled.li`
    display: inline-block;
  `;
  const Button = styled.button`
    cursor: pointer;
    margin: 0;
    padding: 10px;
    color: ${white};
    background: none;
    border-style: solid;
    border-color: transparent;
    border-width: 0 0 3px 0;
    transition: border 150ms ease-in;
    -webkit-transition: border 150ms ease-in;
    ${theme.baseTypes.hover} {
      &:enabled {
        border-bottom-color: ${highlight};
      }
    }
    &:disabled {
      cursor: default;
      border-bottom-color: ${highlightHover};
    }
  `;
  const H2 = styled.h2`
    margin: 0;
    color: ${highlightHover};
  `;
  const links = [];
  if (topics && topics.length > 0) {
    topics.forEach((category) => {
      links.push(
        <Li key={category.id}>
          <Button
            type="button"
            disabled={activeCategory === category.category}
            onClick={() => setCurrentCategory(category)}
          >
            <H2>{category.category}</H2>
          </Button>
        </Li>
      );
    });
  }
  return (
    <ScrollContainer css={ScrollCon} horizontal={true}>
      <Ul>{links}</Ul>
    </ScrollContainer>
  );
}

export default CategoriesHeader;

CategoriesHeader.defaultProps = {
  topics: [<li key="loading">Loading Categories...</li>],
};
