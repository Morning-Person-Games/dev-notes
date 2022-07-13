import { css } from "@emotion/react";
import a400 from "./andika-new-basic-v17-latin-700.woff";
import a400w2 from "./andika-new-basic-v17-latin-700.woff2";
import a700 from "./andika-new-basic-v17-latin-700.woff";
import a700w2 from "./andika-new-basic-v17-latin-700.woff2";
import aI from "./andika-new-basic-v17-latin-italic.woff";
import aIw2 from "./andika-new-basic-v17-latin-italic.woff2";
import a700I from "./andika-new-basic-v17-latin-700italic.woff";
import a700Iw2 from "./andika-new-basic-v17-latin-700italic.woff2";

const andikaFontFace = css`
  @font-face {
    font-family: "Andika";
    font-style: normal;
    font-weight: 400;
    src: local(""), url(${a400w2}) format("woff2"), url(${a400}) format("woff");
  }
  @font-face {
    font-family: "Andika";
    font-style: italic;
    font-weight: 400;
    src: local(""), url(${aIw2}) format("woff2"), url(${aI}) format("woff");
  }
  @font-face {
    font-family: "Andika";
    font-style: normal;
    font-weight: 700;
    src: local(""), url(${a700w2}) format("woff2"), url(${a700}) format("woff");
  }
  @font-face {
    font-family: "Andika";
    font-style: italic;
    font-weight: 700;
    src: local(""), url(${a700Iw2}) format("woff2"),
      url(${a700I}) format("woff");
  }
`;

export default andikaFontFace;
