import { css } from "@emotion/react";
import m400 from "./merriweather-v30-latin-regular.woff";
import m400w2 from "./merriweather-v30-latin-regular.woff2";
import m700 from "./merriweather-v30-latin-700.woff";
import m700w2 from "./merriweather-v30-latin-700.woff2";
import mI from "./merriweather-v30-latin-italic.woff";
import mIw2 from "./merriweather-v30-latin-italic.woff2";
import mI700 from "./merriweather-v30-latin-700italic.woff";
import mI700w2 from "./merriweather-v30-latin-700italic.woff2";

const merriweatherFontFace = css`
  @font-face {
    font-family: "Merriweather";
    font-style: normal;
    font-weight: 400;
    src: local(""), url(${m400w2}) format("woff2"), url(${m400}) format("woff");
  }
  @font-face {
    font-family: "Merriweather";
    font-style: italic;
    font-weight: 400;
    src: local(""), url(${mIw2}) format("woff2"), url(${mI}) format("woff");
  }
  @font-face {
    font-family: "Merriweather";
    font-style: normal;
    font-weight: 700;
    src: local(""), url(${m700w2}) format("woff2"), url(${m700}) format("woff");
  }
  @font-face {
    font-family: "Merriweather";
    font-style: italic;
    font-weight: 700;
    src: local(""), url(${mI700w2}) format("woff2"),
      url(${mI700}) format("woff");
  }
`;
export default merriweatherFontFace;
