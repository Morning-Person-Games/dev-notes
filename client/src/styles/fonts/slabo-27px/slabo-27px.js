import { css } from "@emotion/react";
import s400 from "./slabo-27px-v12-latin-regular.woff";
import s400w2 from "./slabo-27px-v12-latin-regular.woff2";

const slaboFontFace = css`
  @font-face {
    font-family: "Slabo 27px";
    font-style: normal;
    font-weight: 400;
    src: local(""), url(${s400w2}) format("woff2"), url(${s400}) format("woff");
  }
`;
export default slaboFontFace;
