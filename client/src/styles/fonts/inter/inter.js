import { css } from "@emotion/react";
import i400 from "./Inter-Regular.woff";
import i400w2 from "./Inter-Regular.woff2";
import i500 from "./Inter-Medium.woff";
import i500w2 from "./Inter-Medium.woff2";
import i700 from "./Inter-Bold.woff";
import i700w2 from "./Inter-Bold.woff2";
import iI from "./Inter-Italic.woff";
import iIw2 from "./Inter-Italic.woff2";
import iI700 from "./Inter-BoldItalic.woff";
import iI700w2 from "./Inter-BoldItalic.woff2";

const interFontFace = css`
  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    src: local(""), url(${i400w2}) format("woff2"), url(${i400}) format("woff");
  }
  @font-face {
    font-family: "Inter";
    font-style: italic;
    font-weight: 400;
    src: local(""), url(${iIw2}) format("woff2"), url(${iI}) format("woff");
  }
  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    src: local(""), url(${i500w2}) format("woff2"), url(${i500}) format("woff");
  }
  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    src: local(""), url(${i700w2}) format("woff2"), url(${i700}) format("woff");
  }
  @font-face {
    font-family: "Inter";
    font-style: italic;
    font-weight: 700;
    src: local(""), url(${iI700w2}) format("woff2"),
      url(${iI700}) format("woff");
  }
`;

export default interFontFace;
