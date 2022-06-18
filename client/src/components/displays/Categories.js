import React from "react";

function CategoriesHeader({ topics, setCurrentCategory }) {
  const links = [];
  if (topics && topics.length > 0) {
    topics.forEach(function (category) {
      links.push(
        <li key={category.id}>
          <button type="button" onClick={() => setCurrentCategory(category)}>
            {category.category}
          </button>
        </li>
      );
    });
  }
  return <ul>{links}</ul>;
}

export default CategoriesHeader;

CategoriesHeader.defaultProps = {
  topics: [<li key="loading">Loading Categories...</li>],
};
