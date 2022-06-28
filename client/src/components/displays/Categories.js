/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { theme } from "../../globalStyles";
import ScrollContainer from "react-indiana-drag-scroll";

function CategoriesHeader({ topics, setCurrentCategory, activeCategory }) {
  const { highlight, white, highlightHover } = theme.colors;
  const ScrollCon = css`
    ${theme.sizes.colWidth};
    margin-bottom: 15px;
  `;
  const Ul = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    white-space: nowrap;
    width: fit-content;
  `;
  const Li = styled.li`
    display: inline-block;
  `;
  const Button = styled.button`
    margin: 0;
    padding: 12px;
    color: ${white};
    background: none;
    border-style: solid;
    border-color: transparent;
    border-width: 0 0 4px 0;
    transition: border 150ms ease-in;
    -webkit-transition: border 150ms ease-in;
    &:hover {
      &:enabled {
        border-bottom-color: ${highlightHover};
      }
    }
    &:disabled {
      cursor: default;
      border-bottom-color: ${highlight};
    }
  `;
  const H2 = styled.h2`
    margin: 0;
    color: ${highlight};
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
