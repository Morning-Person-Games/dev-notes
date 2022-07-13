import { css } from "@emotion/react";
import p400 from "./pt-sans-v17-latin-regular.woff";
import p400w2 from "./pt-sans-v17-latin-regular.woff2";
import p700 from "./pt-sans-v17-latin-700.woff";
import p700w2 from "./pt-sans-v17-latin-700.woff2";
import pI from "./pt-sans-v17-latin-italic.woff";
import pIw2 from "./pt-sans-v17-latin-italic.woff2";
import pI700 from "./pt-sans-v17-latin-700.woff";
import pI700w2 from "./pt-sans-v17-latin-700.woff2";

const ptsansFontFace = css`
  @font-face {
    font-family: "PT Sans";
    font-style: normal;
    font-weight: 400;
    src: local(""), url(${p400w2}) format("woff2"), url(${p400}) format("woff");
  }
  @font-face {
    font-family: "PT Sans";
    font-style: italic;
    font-weight: 400;
    src: local(""), url(${pIw2}) format("woff2"), url(${pI}) format("woff");
  }
  @font-face {
    font-family: "PT Sans";
    font-style: normal;
    font-weight: 700;
    src: local(""), url(${p700w2}) format("woff2"), url(${p700}) format("woff");
  }
  @font-face {
    font-family: "PT Sans";
    font-style: italic;
    font-weight: 700;
    src: local(""), url(${pI700w2}) format("woff2"),
      url(${pI700}) format("woff");
  }
`;
export default ptsansFontFace;
