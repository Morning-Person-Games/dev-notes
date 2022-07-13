import { css } from "@emotion/react";
import r400 from "./roboto-v30-latin-regular.woff";
import r400w2 from "./roboto-v30-latin-regular.woff2";
import r500 from "./roboto-v30-latin-500.woff";
import r500w2 from "./roboto-v30-latin-500.woff2";
import r700 from "./roboto-v30-latin-700.woff";
import r700w2 from "./roboto-v30-latin-700.woff2";
import rI from "./roboto-v30-latin-italic.woff";
import rIw2 from "./roboto-v30-latin-italic.woff2";
import rI700 from "./roboto-v30-latin-700italic.woff";
import rI700w2 from "./roboto-v30-latin-700italic.woff2";

const robotoFontFace = css`
  @font-face {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    src: local(""), url(${r400w2}) format("woff2"), url(${r400}) format("woff");
  }
  @font-face {
    font-family: "Roboto";
    font-style: italic;
    font-weight: 400;
    src: local(""), url(${rIw2}) format("woff2"), url(${rI}) format("woff");
  }
  @font-face {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    src: local(""), url(${r500w2}) format("woff2"), url(${r500}) format("woff");
  }
  @font-face {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    src: local(""), url(${r700w2}) format("woff2"), url(${r700}) format("woff");
  }
  @font-face {
    font-family: "Roboto";
    font-style: italic;
    font-weight: 700;
    src: local(""), url(${rI700w2}) format("woff2"),
      url(${rI700}) format("woff");
  }
`;
export default robotoFontFace;
