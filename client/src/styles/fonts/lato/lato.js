import { css } from "@emotion/react";
import l400 from "./lato-v23-latin-regular.woff";
import l400w2 from "./lato-v23-latin-regular.woff2";
import l700 from "./lato-v23-latin-700.woff";
import l700w2 from "./lato-v23-latin-700.woff2";
import lI from "./lato-v23-latin-italic.woff";
import lIw2 from "./lato-v23-latin-italic.woff2";
import lI700 from "./lato-v23-latin-700italic.woff";
import lI700w2 from "./lato-v23-latin-700italic.woff2";

const latoFontFace = css`
  @font-face {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    src: local(""), url(${l400w2}) format("woff2"), url(${l400}) format("woff");
  }
  @font-face {
    font-family: "Lato";
    font-style: italic;
    font-weight: 400;
    src: local(""), url(${lIw2}) format("woff2"), url(${lI}) format("woff");
  }
  @font-face {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    src: local(""), url(${l700w2}) format("woff2"), url(${l700}) format("woff");
  }
  @font-face {
    font-family: "Lato";
    font-style: italic;
    font-weight: 700;
    src: local(""), url(${lI700w2}) format("woff2"),
      url(${lI700}) format("woff");
  }
`;

export default latoFontFace;
