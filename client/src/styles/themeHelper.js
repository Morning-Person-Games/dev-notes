import { css } from "@emotion/react";
import { mixins, baseTypes, staticSizes } from "./globalStyles";
import defaultColors from "./defaultColors";
import { math, darken, lighten, transparentize } from "polished";
import { toast } from "react-toastify";

function formattedThemePreview(palette, count) {
  return css`
    .select__option:nth-of-type(${count}) {
      color: ${palette.white};
      ${mixins.backgroundGradient(palette.primary, palette.secondary)};
      &.select__option--is-disabled {
        // disabled means its the currentTheme
        color: ${palette.placeholder};
        cursor: default;
        ${baseTypes.hover} {
          &::before {
            opacity: 0;
          }
        }
      }
      &.current {
        color: ${palette.placeholder};
      }
      &::before {
        ${mixins.transition("opacity", 250)};
        position: absolute;
        border-radius: ${staticSizes.radius};
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        opacity: 0;
        z-index: -1;
        content: "";
        ${mixins.backgroundGradient(palette.highlight, palette.primary)};
      }
      ${baseTypes.hover} {
        &::before {
          opacity: 1;
        }
      }
    }
  `;
}

function formatThemesList(themes) {
  const themesObject = {
    themes: [{ title: "Default", theme: defaultColors }],
    previewStyles: [formattedThemePreview(defaultColors, 1)],
    options: [{ value: "Default", label: "Default" }],
    getTheme: () => {
      toast.warning("Issue finding theme. Reloading to avoid errors.");
      window.location.reload(false);
    },
  };
  for (let i = 0; i < themes.length; i++) {
    const colors = getColorsFromTheme(themes[i]);
    themesObject.themes.push({ title: themes[i].title, theme: colors });
    themesObject.previewStyles.push(formattedThemePreview(colors, i + 2));
    themesObject.options.push({
      value: themes[i].title,
      label: themes[i].title,
    });
  }
  themesObject.getTheme = (themeTitle) => {
    if (themesObject.themes) {
      const themeFound = themesObject.themes.find(
        (t) => t.title === themeTitle
      );
      if (themeFound) {
        return themeFound.theme;
      }
    }
    console.warn(
      "Issue getting theme from theme Object, returning default theme"
    );
    return defaultColors;
  };
  return themesObject;
}

function getThemeSizes(newTextSize) {
  const sizes = {};
  sizes.baseFontSize = newTextSize; // Default fontsizes:
  sizes.screenSm = math(newTextSize + "* 20px"); // 320px
  sizes.smCol = math(sizes.screenSm + "- 20px"); // 300px
  sizes.mdCol = math(sizes.smCol + "* 1.5"); // 450px
  sizes.lgCol = math(sizes.smCol + "* 2"); // 600px
  sizes.screenMd = math(sizes.smCol + "* 2 + 30px"); // 630px
  sizes.screenLg = math("(" + sizes.mdCol + "* 2) + 50px"); // 950px
  sizes.screenXl = math("(" + sizes.lgCol + "* 2) + 50px"); // 1250px
  sizes.maxWidth = math(sizes.screenLg + " - 40px"); // 910px
  return sizes;
}

function getColorsFromTheme(newTheme) {
  const newColors = JSON.parse(JSON.stringify(newTheme));
  newColors.text = newColors.white;
  newColors.inactiveColor = newColors.gray;
  newColors.background = newColors.background
    ? newColors.background
    : darken("0.15", newColors.primary);

  newColors.secondary = newColors.secondary
    ? newColors.secondary
    : darken("0.07", newColors.primary);

  newColors.highlightHover = newColors.highlightHover
    ? newColors.highlightHover
    : lighten("0.1", newColors.highlight);

  newColors.placeholder = newColors.placeholder
    ? newColors.placeholder
    : lighten(0.15, newColors.gray);

  newColors.link = newColors.link
    ? newColors.link
    : lighten(0.15, newColors.highlight);

  newColors.linkHover = newColors.linkHover
    ? newColors.linkHover
    : darken(0.1, newColors.link);

  newColors.codeBlock = newColors.codeBlock
    ? newColors.codeBlock
    : newColors.background;

  newColors.codeLine = newColors.codeLine
    ? newColors.codeLine
    : transparentize(0.3, lighten(0.1, newColors.primary));

  newColors.codeText = newColors.codeText
    ? newColors.codeText
    : newColors.white;

  newColors.shadow = transparentize(0.4, "rgb(15,17,28)");
  newColors.fieldHover = lighten(0.025, newColors.secondary);
  newColors.reverseFieldHover = lighten(0.035, newColors.primary);
  return newColors;
}

export { getColorsFromTheme, getThemeSizes, formatThemesList };
