import React from "react";
import { Link } from "react-router-dom";

function CategoriesHeader({ content }) {
  const links = [
    <li key="all">
      <Link to="/">All</Link>
    </li>,
  ];
  if (content !== null) {
    content.forEach(function (category) {
      links.push(
        <li key={category.id}>
          <Link to={category.path}>{category.category}</Link>
        </li>
      );
    });
  }
  return <ul>{links}</ul>;
}

export default CategoriesHeader;
