import { css } from "@emotion/react";
import { theme, mixins } from "./globalStyles";
const { colors, baseTypes } = theme;

const track = css`
  width: 100%;
  height: 10px;
  cursor: pointer;
  background: ${colors.primary};
  border-radius: 10px;
  border: 0;
  ${mixins.transition()};
  &:hover {
    background-color: ${colors.reverseFieldHover};
  }
`;
const thumb = css`
  height: 28px;
  width: 28px;
  border-radius: 30px;
  border: 0;
  background-color: ${colors.highlight};
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -9.5px;
  ${mixins.transition()};
  ${baseTypes.hover} {
    box-shadow: 0px 0px 1px 3px ${colors.background};
    background-color: ${colors.highlightHover};
  }
`;

const range = css`
  &[type="range"] {
    height: 39px;
    -webkit-appearance: none;
    margin: 0;
    width: 100%;
    ${mixins.transition()};
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
