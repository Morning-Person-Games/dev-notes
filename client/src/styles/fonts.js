import { css } from "@emotion/react";
import andikaFontFace from "./fonts/andika/anidka";
import interFontFace from "./fonts/inter/inter";
import karlaFontFace from "./fonts/karla/karla";
import latoFontFace from "./fonts/lato/lato";
import merriweatherFontFace from "./fonts/merriweather/merriweather";
import montserratFontFace from "./fonts/montserrat/montserrat";
import opensansFontFace from "./fonts/open-sans/open-sans";
import oswaldFontFace from "./fonts/oswald/oswald";
import ptsansFontFace from "./fonts/pt-sans/pt-sans";
import quicksandFontFace from "./fonts/quicksand/quicksand";
import robotoFontFace from "./fonts/roboto/roboto";
import robotoCondensedFontFace from "./fonts/roboto-condensed/roboto-condensed";
import slaboFontFace from "./fonts/slabo-27px/slabo-27px";
import sourcesansFontFace from "./fonts/source-sans/source-sans";
import sourceserifFontFace from "./fonts/source-sans-serif/source-sans-serif";

const systemStack = `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
"Oxygen", "Ubuntu", "Cantarell", "Droid Sans",
"Helvetica Neue", sans-serif`;

const serifStack = `Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, Constantia, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif;`;

// Additonal fonts can easily be added by copying this process
const fonts = [
  {
    fontName: "System Default",
    type: "sans",
    fontFace: "",
    fontID: "",
  },
  {
    fontName: "Andika",
    type: "sans",
    fontFace: andikaFontFace,
    fontID: '"Andika"',
  },
  {
    fontName: "Arial",
    type: "sans",
    fontFace: "",
    fontID: '"Arial"',
  },
  {
    fontName: "Inter",
    type: "sans",
    fontFace: interFontFace,
    fontID: '"Inter"',
  },
  {
    fontName: "Karla",
    type: "sans",
    fontFace: karlaFontFace,
    fontID: '"Karla"',
  },
  {
    fontName: "Lato",
    type: "sans",
    fontFace: latoFontFace,
    fontID: '"Lato"',
  },
  {
    fontName: "Montserrat",
    type: "sans",
    fontFace: montserratFontFace,
    fontID: '"Montserrat"',
  },
  {
    fontName: "Open Sans",
    type: "sans",
    fontFace: opensansFontFace,
    fontID: '"Open Sans"',
  },
  {
    fontName: "PT Sans",
    type: "sans",
    fontFace: ptsansFontFace,
    fontID: '"PT Sans"',
  },
  {
    fontName: "Quicksand",
    type: "sans",
    fontFace: quicksandFontFace,
    fontID: '"Quicksand"',
  },
  {
    fontName: "Roboto",
    type: "sans",
    fontFace: robotoFontFace,
    fontID: '"Roboto"',
  },
  {
    fontName: "Source Sans Pro",
    type: "sans",
    fontFace: sourcesansFontFace,
    fontID: '"Source Sans Pro"',
  },
  {
    fontName: "Oswald",
    type: "condensed",
    fontFace: oswaldFontFace,
    fontID: '"Oswald"',
  },
  {
    fontName: "Roboto Condensed",
    type: "condensed",
    fontFace: robotoCondensedFontFace,
    fontID: '"Roboto Condensed"',
  },
  {
    fontName: "Serif Default",
    type: "serif",
    fontFace: "",
    fontID: serifStack,
  },
  {
    fontName: "Georgia",
    type: "serif",
    fontFace: "",
    fontID: '"Georgia"',
  },
  {
    fontName: "Merriweather",
    type: "serif",
    fontFace: merriweatherFontFace,
    fontID: '"Merriweather"',
  },
  {
    fontName: "Slabo 27px",
    type: "serif",
    fontFace: slaboFontFace,
    fontID: '"Slabo 27px"',
  },
  {
    fontName: "Source Serif Pro",
    type: "serif",
    fontFace: sourceserifFontFace,
    fontID: '"Source Serif Pro"',
  },
  {
    fontName: "Times New Roman",
    type: "serif",
    fontFace: "",
    fontID: '"Times", "Times New Roman"',
  },
  {
    fontName: "Comic Sans",
    type: "comic",
    fontFace: "",
    fontID: '"Comic Sans MS", "Comic Sans"',
  },
];

function getFont(fontTitle) {
  return fonts.find((font) => font.fontName === fontTitle);
}

const smooting =
  "-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;";

function getFontStyles(fontTitle) {
  const font = fonts.find((font) => font.fontName === fontTitle);
  if (!font) {
    return css`
      html,
      body {
        font-family: ${systemStack};
      }
      * {
        font-family: ${systemStack};
        ${smooting};
      }
    `;
  }
  const fontStack = font.serifStack ? serifStack : systemStack;
  if (!font.fontID) {
    return css`
      html,
      body {
        font-family: ${fontStack};
      }
      * {
        font-family: ${fontStack};
        ${smooting};
      }
    `;
  }
  const fontFamily = [font.fontID, fontStack].join(", ");
  return css`
    ${font.fontFace && font.fontFace};
    html,
    body {
      font-family: ${fontFamily};
    }
    * {
      font-family: ${fontFamily};
      ${smooting};
    }
  `;
}

function getAllFontFaces() {
  const fontFaceArray = [];
  fonts.forEach((font) => {
    if (font.fontFace !== "") {
      fontFaceArray.push(font.fontFace);
    }
  });
  return fontFaceArray;
}

function getFontOptions() {
  const sans = [
    {
      value: "",
      label: "Sans Fonts:",
      isdisabled: true,
      id: "_HEADING",
    },
  ];
  const condensed = [
    {
      value: "",
      label: "Condensed Fonts:",
      isdisabled: true,
      id: "_HEADING",
    },
  ];
  const serif = [
    {
      value: "",
      label: "Serif Fonts:",
      isdisabled: true,
      id: "_HEADING",
    },
  ];

  fonts.forEach((font) => {
    if (font.type === "sans") {
      sans.push({
        value: font.fontName,
        label: font.fontName,
        id: font.fontID,
      });
    }
    if (font.type === "condensed") {
      condensed.push({
        value: font.fontName,
        label: font.fontName,
        id: font.fontID,
      });
    }
    if (font.type === "serif") {
      serif.push({
        value: font.fontName,
        label: font.fontName,
        id: font.fontID,
      });
    }
  });
  return [].concat(
    sans,
    condensed,
    serif,
    {
      value: "",
      label: "gRaPhIc DeSiGn Is mY pAsSiOn",
      isdisabled: true,
      id: "_HEADING",
    },
    {
      value: "Comic Sans",
      label: "Comic Sans",
      id: '"Comic Sans MS", "Comic Sans"',
    }
  );
}

export { getFont, getFontStyles, getFontOptions, getAllFontFaces };
