import { css } from "@emotion/react";
import r400 from "./roboto-condensed-v25-latin-regular.woff";
import r400w2 from "./roboto-condensed-v25-latin-regular.woff2";
import r700 from "./roboto-condensed-v25-latin-700.woff";
import r700w2 from "./roboto-condensed-v25-latin-700.woff2";
import rI from "./roboto-condensed-v25-latin-italic.woff";
import rIw2 from "./roboto-condensed-v25-latin-italic.woff2";
import rI700 from "./roboto-condensed-v25-latin-700.woff";
import rI700w2 from "./roboto-condensed-v25-latin-700.woff2";

const robotoCondensedFontFace = css`
  @font-face {
    font-family: "Roboto Condensed";
    font-style: normal;
    font-weight: 400;
    src: local(""), url(${r400w2}) format("woff2"), url(${r400}) format("woff");
  }
  @font-face {
    font-family: "Roboto Condensed";
    font-style: italic;
    font-weight: 400;
    src: local(""), url(${rIw2}) format("woff2"), url(${rI}) format("woff");
  }
  @font-face {
    font-family: "Roboto Condensed";
    font-style: normal;
    font-weight: 700;
    src: local(""), url(${r700w2}) format("woff2"), url(${r700}) format("woff");
  }
  @font-face {
    font-family: "Roboto Condensed";
    font-style: italic;
    font-weight: 700;
    src: local(""), url(${rI700w2}) format("woff2"),
      url(${rI700}) format("woff");
  }
`;
export default robotoCondensedFontFace;
