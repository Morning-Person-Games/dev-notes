import { css } from "@emotion/react";
import { theme } from "./globalStyles";
const { colors, baseTypes } = theme;
const hover = css`
  box-shadow: 0px 0px 4px ${colors.shadow};
`;
const track = css`
  width: 100%;
  height: 10px;
  cursor: pointer;
  background: ${colors.primary};
  border-radius: 10px;
  border: 0;
`;
const thumb = css`
  height: 30px;
  width: 30px;
  border-radius: 30px;
  border: 0;
  background: ${colors.highlight};
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -11px;
  ${baseTypes.hover} {
    ${hover};
  }
`;

const range = css`
  &[type="range"] {
    height: 39px;
    -webkit-appearance: none;
    margin: 0;
    width: 100%;
    &:focus {
      outline: none;
    }

    &::-webkit-slider-runnable-track {
      ${track};
    }
    &::-webkit-slider-thumb {
      ${thumb}
    }
    &:focus::-webkit-slider-runnable-track {
      background: ${colors.primary};
    }
    &::-moz-range-track {
      ${track};
    }
    &::-moz-range-thumb {
      ${thumb};
    }
  }
`;

export default range;
