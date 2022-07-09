import React from "react";
import { Link } from "react-router-dom";
function CreationError({ title }) {
  return (
    <div>
      {title}
      <Link to="/logout">Try logging out</Link> and logging back in, then try
      again. If that doesn't work I'd suggest{" "}
      <a
        href="https://app.contentful.com/login"
        target="_blank"
        rel="noreferrer"
      >
        checking contentful
      </a>{" "}
      to see what went wrong.
    </div>
  );
}

export default CreationError;
