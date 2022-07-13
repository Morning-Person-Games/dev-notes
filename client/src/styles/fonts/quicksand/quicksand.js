import { css } from "@emotion/react";
import q400 from "./quicksand-v29-latin-regular.woff";
import q400w2 from "./quicksand-v29-latin-regular.woff2";
import q500 from "./quicksand-v29-latin-500.woff";
import q500w2 from "./quicksand-v29-latin-500.woff2";
import q700 from "./quicksand-v29-latin-700.woff";
import q700w2 from "./quicksand-v29-latin-700.woff2";

const quicksandFontFace = css`
  @font-face {
    font-family: "Quicksand";
    font-style: normal;
    font-weight: 500;
    src: local(""), url(${q500w2}) format("woff2"), url(${q500}) format("woff");
  }
  @font-face {
    font-family: "Quicksand";
    font-style: normal;
    font-weight: 400;
    src: local(""), url(${q400w2}) format("woff2"), url(${q400}) format("woff");
  }
  @font-face {
    font-family: "Quicksand";
    font-style: normal;
    font-weight: 700;
    src: local(""), url(${q700w2}) format("woff2"), url(${q700}) format("woff");
  }
`;
export default quicksandFontFace;
