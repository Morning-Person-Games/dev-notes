import { css } from "@emotion/react";
import o400 from "./open-sans-v29-latin-regular.woff";
import o400w2 from "./open-sans-v29-latin-regular.woff2";
import o500 from "./open-sans-v29-latin-500.woff";
import o500w2 from "./open-sans-v29-latin-500.woff2";
import o700 from "./open-sans-v29-latin-700.woff";
import o700w2 from "./open-sans-v29-latin-700.woff2";
import oI from "./open-sans-v29-latin-italic.woff";
import oIw2 from "./open-sans-v29-latin-italic.woff2";
import oI700 from "./open-sans-v29-latin-700italic.woff";
import oI700w2 from "./open-sans-v29-latin-700italic.woff";

const opensansFontFace = css`
  @font-face {
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 400;
    src: local(""), url(${o400w2}) format("woff2"), url(${o400}) format("woff");
  }
  @font-face {
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 500;
    src: local(""), url(${o500w2}) format("woff2"), url(${o500}) format("woff");
  }
  @font-face {
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 700;
    src: local(""), url(${o700w2}) format("woff2"), url(${o700}) format("woff");
  }
  @font-face {
    font-family: "Open Sans";
    font-style: italic;
    font-weight: 400;
    src: local(""), url(${oIw2}) format("woff2"), url(${oI}) format("woff");
  }
  @font-face {
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 700;
    src: local(""), url(${o700w2}) format("woff2"), url(${o700}) format("woff");
  }
  @font-face {
    font-family: "Open Sans";
    font-style: italic;
    font-weight: 700;
    src: local(""), url(${oI700w2}) format("woff2"),
      url(${oI700}) format("woff");
  }
`;

export default opensansFontFace;
