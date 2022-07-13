import { css } from "@emotion/react";
import o400 from "./oswald-v48-latin-regular.woff";
import o400w2 from "./oswald-v48-latin-regular.woff2";
import o500 from "./oswald-v48-latin-500.woff";
import o500w2 from "./oswald-v48-latin-500.woff2";
import o700 from "./oswald-v48-latin-700.woff";
import o700w2 from "./oswald-v48-latin-700.woff2";

const oswaldFontFace = css`
  @font-face {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 400;
    src: local(""), url(${o400w2}) format("woff2"), url(${o400}) format("woff");
  }
  @font-face {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 500;
    src: local(""), url(${o500w2}) format("woff2"), url(${o500}) format("woff");
  }
  @font-face {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    src: local(""), url(${o700w2}) format("woff2"), url(${o700}) format("woff");
  }
`;
export default oswaldFontFace;
