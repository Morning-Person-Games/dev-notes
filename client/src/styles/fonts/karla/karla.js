import { css } from "@emotion/react";
import k400 from "./karla-v22-latin-regular.woff";
import k400w2 from "./karla-v22-latin-regular.woff2";
import k500 from "./karla-v22-latin-500.woff";
import k500w2 from "./karla-v22-latin-500.woff2";
import k700 from "./karla-v22-latin-700.woff";
import k700w2 from "./karla-v22-latin-700.woff2";
import kI from "./karla-v22-latin-700italic.woff";
import kIw2 from "./karla-v22-latin-700italic.woff2";
import kI700 from "./karla-v22-latin-700italic.woff";
import kI700w2 from "./karla-v22-latin-700italic.woff2";

const karlaFontFace = css`
  @font-face {
    font-family: "Karla";
    font-style: normal;
    font-weight: 400;
    src: local(""), url(${k400w2}) format("woff2"), url(${k400}) format("woff");
  }
  @font-face {
    font-family: "Karla";
    font-style: normal;
    font-weight: 600;
    src: local(""), url(${k500w2}) format("woff2"), url(${k500}) format("woff");
  }
  @font-face {
    font-family: "Karla";
    font-style: normal;
    font-weight: 700;
    src: local(""), url(${k700w2}) format("woff2"), url(${k700}) format("woff");
  }
  @font-face {
    font-family: "Karla";
    font-style: italic;
    font-weight: 400;
    src: local(""), url(${kIw2}) format("woff2"), url(${kI}) format("woff");
  }
  @font-face {
    font-family: "Karla";
    font-style: italic;
    font-weight: 700;
    src: local(""), url(${kI700w2}) format("woff2"),
      url(${kI700}) format("woff");
  }
`;

export default karlaFontFace;
