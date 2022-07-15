import { css } from "@emotion/react";
import s400 from "./source-serif-pro-v15-latin-regular.woff";
import s400w2 from "./source-serif-pro-v15-latin-regular.woff2";
import s500 from "./source-serif-pro-v15-latin-600.woff";
import s500w2 from "./source-serif-pro-v15-latin-600.woff2";
import s700 from "./source-serif-pro-v15-latin-700.woff";
import s700w2 from "./source-serif-pro-v15-latin-700.woff2";
import sI from "./source-serif-pro-v15-latin-italic.woff";
import sIw2 from "./source-serif-pro-v15-latin-italic.woff2";
import sI700 from "./source-serif-pro-v15-latin-700italic.woff";
import sI700w2 from "./source-serif-pro-v15-latin-700italic.woff2";

const sourceserifFontFace = css`
  @font-face {
    font-family: "Source Serif Pro";
    font-style: normal;
    font-weight: 400;
    src: local(""), url(${s400w2}) format("woff2"), url(${s400}) format("woff");
  }
  @font-face {
    font-family: "Source Serif Pro";
    font-style: italic;
    font-weight: 400;
    src: local(""), url(${sIw2}) format("woff2"), url(${sI}) format("woff");
  }
  @font-face {
    font-family: "Source Serif Pro";
    font-style: normal;
    font-weight: 600;
    src: local(""), url(${s500w2}) format("woff2"), url(${s500}) format("woff");
  }
  @font-face {
    font-family: "Source Serif Pro";
    font-style: normal;
    font-weight: 700;
    src: local(""), url(${s700w2}) format("woff2"), url(${s700}) format("woff");
  }
  @font-face {
    font-family: "Source Serif Pro";
    font-style: italic;
    font-weight: 700;
    src: local(""), url(${sI700w2}) format("woff2"),
      url(${sI700}) format("woff");
  }
`;
export default sourceserifFontFace;
