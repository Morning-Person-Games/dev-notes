import { css } from "@emotion/react";

// Additonal fonts can easily be added by copying this process
const fonts = [
  {
    fontName: "System Default",
    type: "sans",
    fontFace: "",
    altFontName: "",
  },
  {
    fontName: "Andika",
    type: "sans",
    fontFace: css`
      /* andika-new-basic-regular - latin */
      @font-face {
        font-family: "Andika";
        font-style: normal;
        font-weight: 400;
        src: local(""),
          url("./fonts/andika/andika-new-basic-v17-latin-regular.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/andika/andika-new-basic-v17-latin-regular.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      /* andika-new-basic-italic - latin */
      @font-face {
        font-family: "Andika";
        font-style: italic;
        font-weight: 400;
        src: local(""),
          url("./fonts/andika/andika-new-basic-v17-latin-italic.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/andika/andika-new-basic-v17-latin-italic.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      /* andika-new-basic-700 - latin */
      @font-face {
        font-family: "Andika";
        font-style: normal;
        font-weight: 700;
        src: local(""),
          url("./fonts/andika/andika-new-basic-v17-latin-700.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/andika/andika-new-basic-v17-latin-700.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      /* andika-new-basic-700italic - latin */
      @font-face {
        font-family: "Andika";
        font-style: italic;
        font-weight: 700;
        src: local(""),
          url("./fonts/andika/andika-new-basic-v17-latin-700italic.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/andika/andika-new-basic-v17-latin-700italic.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
    `,
  },
  {
    fontName: "Inter",
    type: "sans",
    fontFace: css`
      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        src: local(""),
          url("./fonts/inter/Inter-Regular.woff2?v=3.19") format("woff2"),
          url("./fonts/inter/Inter-Regular.woff?v=3.19") format("woff");
      }
      @font-face {
        font-family: "Inter";
        font-style: italic;
        font-weight: 400;
        src: local(""),
          url("./fonts/inter/Inter-Italic.woff2?v=3.19") format("woff2"),
          url("./fonts/inter/Inter-Italic.woff?v=3.19") format("woff");
      }
      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 500;
        src: local(""),
          url("./fonts/inter/Inter-Medium.woff2?v=3.19") format("woff2"),
          url("./fonts/inter/Inter-Medium.woff?v=3.19") format("woff");
      }
      @font-face {
        font-family: "Inter";
        font-style: italic;
        font-weight: 500;
        src: local(""),
          url("./fonts/inter/Inter-MediumItalic.woff2?v=3.19") format("woff2"),
          url("./fonts/inter/Inter-MediumItalic.woff?v=3.19") format("woff");
      }
      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 700;
        src: local(""),
          url("./fonts/inter/Inter-Bold.woff2?v=3.19") format("woff2"),
          url("./fonts/inter/Inter-Bold.woff?v=3.19") format("woff");
      }
      @font-face {
        font-family: "Inter";
        font-style: italic;
        font-weight: 700;
        src: local(""),
          url("./fonts/inter/Inter-BoldItalic.woff2?v=3.19") format("woff2"),
          url("./fonts/inter/Inter-BoldItalic.woff?v=3.19") format("woff");
      }
    `,
  },
  {
    fontName: "Karla",
    type: "sans",
    fontFace: css`
      @font-face {
        font-family: "Karla";
        font-style: normal;
        font-weight: 400;
        src: local(""),
          url("./fonts/karla/karla-v22-latin-regular.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/karla/karla-v22-latin-regular.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Karla";
        font-style: normal;
        font-weight: 500;
        src: local(""),
          url("./fonts/karla/karla-v22-latin-500.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/karla/karla-v22-latin-500.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Karla";
        font-style: normal;
        font-weight: 700;
        src: local(""),
          url("./fonts/karla/karla-v22-latin-700.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/karla/karla-v22-latin-700.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Karla";
        font-style: italic;
        font-weight: 400;
        src: local(""),
          url("./fonts/karla/karla-v22-latin-italic.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/karla/karla-v22-latin-italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Karla";
        font-style: italic;
        font-weight: 700;
        src: local(""),
          url("./fonts/karla/karla-v22-latin-700italic.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/karla/karla-v22-latin-700italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
    `,
  },
  {
    fontName: "Lato",
    type: "sans",
    fontFace: css`
      @font-face {
        font-family: "Lato";
        font-style: normal;
        font-weight: 400;
        src: local(""),
          url("./fonts/lato/lato-v23-latin-regular.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/lato/lato-v23-latin-regular.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Lato";
        font-style: italic;
        font-weight: 400;
        src: local(""),
          url("./fonts/lato/lato-v23-latin-italic.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/lato/lato-v23-latin-italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Lato";
        font-style: normal;
        font-weight: 700;
        src: local(""),
          url("./fonts/lato/lato-v23-latin-700.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/lato/lato-v23-latin-700.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Lato";
        font-style: italic;
        font-weight: 700;
        src: local(""),
          url("./fonts/lato/lato-v23-latin-700italic.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/lato/lato-v23-latin-700italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
    `,
  },
  {
    fontName: "Montserrat",
    type: "sans",
    fontFace: css`
      @font-face {
        font-family: "Montserrat";
        font-style: normal;
        font-weight: 400;
        src: local(""),
          url("./fonts/montserrat/montserrat-v24-latin-regular.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/montserrat/montserrat-v24-latin-regular.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Montserrat";
        font-style: normal;
        font-weight: 500;
        src: local(""),
          url("./fonts/montserrat/montserrat-v24-latin-500.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/montserrat/montserrat-v24-latin-500.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Montserrat";
        font-style: normal;
        font-weight: 700;
        src: local(""),
          url("./fonts/montserrat/montserrat-v24-latin-700.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/montserrat/montserrat-v24-latin-700.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Montserrat";
        font-style: italic;
        font-weight: 400;
        src: local(""),
          url("./fonts/montserrat/montserrat-v24-latin-italic.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/montserrat/montserrat-v24-latin-italic.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Montserrat";
        font-style: italic;
        font-weight: 700;
        src: local(""),
          url("./fonts/montserrat/montserrat-v24-latin-700italic.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/montserrat/montserrat-v24-latin-700italic.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
    `,
  },
  {
    fontName: "Open Sans",
    type: "sans",
    fontFace: css`
      @font-face {
        font-family: "Open Sans";
        font-style: normal;
        font-weight: 400;
        src: local(""),
          url("./fonts/open-sans/open-sans-v29-latin-regular.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/open-sans/open-sans-v29-latin-regular.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Open Sans";
        font-style: normal;
        font-weight: 500;
        src: local(""),
          url("./fonts/open-sans/open-sans-v29-latin-500.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/open-sans/open-sans-v29-latin-500.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Open Sans";
        font-style: normal;
        font-weight: 700;
        src: local(""),
          url("./fonts/open-sans/open-sans-v29-latin-700.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/open-sans/open-sans-v29-latin-700.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Open Sans";
        font-style: italic;
        font-weight: 400;
        src: local(""),
          url("./fonts/open-sans/open-sans-v29-latin-italic.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/open-sans/open-sans-v29-latin-italic.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Open Sans";
        font-style: italic;
        font-weight: 500;
        src: local(""),
          url("./fonts/open-sans/open-sans-v29-latin-500italic.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/open-sans/open-sans-v29-latin-500italic.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Open Sans";
        font-style: italic;
        font-weight: 700;
        src: local(""),
          url("./fonts/open-sans/open-sans-v29-latin-700italic.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/open-sans/open-sans-v29-latin-700italic.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
    `,
  },
  {
    fontName: "PT Sans",
    type: "sans",
    fontFace: css`
      @font-face {
        font-family: "PT Sans";
        font-style: normal;
        font-weight: 400;
        src: local(""),
          url("./fonts/pt-sans/pt-sans-v17-latin-regular.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/pt-sans/pt-sans-v17-latin-regular.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "PT Sans";
        font-style: italic;
        font-weight: 400;
        src: local(""),
          url("./fonts/pt-sans/pt-sans-v17-latin-italic.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/pt-sans/pt-sans-v17-latin-italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "PT Sans";
        font-style: normal;
        font-weight: 700;
        src: local(""),
          url("./fonts/pt-sans/pt-sans-v17-latin-700.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/pt-sans/pt-sans-v17-latin-700.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "PT Sans";
        font-style: italic;
        font-weight: 700;
        src: local(""),
          url("./fonts/pt-sans/pt-sans-v17-latin-700italic.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/pt-sans/pt-sans-v17-latin-700italic.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
    `,
  },
  {
    fontName: "Quicksand",
    type: "sans",
    fontFace: css`
      @font-face {
        font-family: "Quicksand";
        font-style: normal;
        font-weight: 500;
        src: local(""),
          url("./fonts/quicksand/quicksand-v29-latin-500.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/quicksand/quicksand-v29-latin-500.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Quicksand";
        font-style: normal;
        font-weight: 400;
        src: local(""),
          url("./fonts/quicksand/quicksand-v29-latin-regular.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/quicksand/quicksand-v29-latin-regular.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Quicksand";
        font-style: normal;
        font-weight: 700;
        src: local(""),
          url("./fonts/quicksand/quicksand-v29-latin-700.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/quicksand/quicksand-v29-latin-700.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
    `,
  },
  {
    fontName: "Roboto",
    type: "sans",
    fontFace: css`
      @font-face {
        font-family: "Roboto";
        font-style: normal;
        font-weight: 400;
        src: local(""),
          url("./fonts/roboto/roboto-v30-latin-regular.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/roboto/roboto-v30-latin-regular.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Roboto";
        font-style: italic;
        font-weight: 400;
        src: local(""),
          url("./fonts/roboto/roboto-v30-latin-italic.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/roboto/roboto-v30-latin-italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Roboto";
        font-style: normal;
        font-weight: 500;
        src: local(""),
          url("./fonts/roboto/roboto-v30-latin-500.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/roboto/roboto-v30-latin-500.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Roboto";
        font-style: italic;
        font-weight: 500;
        src: local(""),
          url("./fonts/roboto/roboto-v30-latin-500italic.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/roboto/roboto-v30-latin-500italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Roboto";
        font-style: normal;
        font-weight: 700;
        src: local(""),
          url("./fonts/roboto/roboto-v30-latin-700.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/roboto/roboto-v30-latin-700.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Roboto";
        font-style: italic;
        font-weight: 700;
        src: local(""),
          url("./fonts/roboto/roboto-v30-latin-700italic.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/roboto/roboto-v30-latin-700italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
    `,
  },
  {
    fontName: "Source Sans Pro",
    type: "sans",
    fontFace: css`
      @font-face {
        font-family: "Source Sans Pro";
        font-style: normal;
        font-weight: 400;
        src: local(""),
          url("./fonts/source-sans/source-sans-pro-v21-latin-regular.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/source-sans/source-sans-pro-v21-latin-regular.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Source Sans Pro";
        font-style: italic;
        font-weight: 400;
        src: local(""),
          url("./fonts/source-sans/source-sans-pro-v21-latin-italic.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/source-sans/source-sans-pro-v21-latin-italic.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Source Sans Pro";
        font-style: normal;
        font-weight: 500;
        src: local(""),
          url("./fonts/source-sans/source-sans-pro-v21-latin-600.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/source-sans/source-sans-pro-v21-latin-600.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Source Sans Pro";
        font-style: normal;
        font-weight: 700;
        src: local(""),
          url("./fonts/source-sans/source-sans-pro-v21-latin-700.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/source-sans/source-sans-pro-v21-latin-700.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Source Sans Pro";
        font-style: italic;
        font-weight: 700;
        src: local(""),
          url("./fonts/source-sans/source-sans-pro-v21-latin-700italic.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/source-sans/source-sans-pro-v21-latin-700italic.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
    `,
  },
  {
    fontName: "Ubuntu",
    type: "sans",
    fontFace: css`
      @font-face {
        font-family: "Ubuntu";
        font-style: normal;
        font-weight: 400;
        src: local(""),
          url("./fonts/ubuntu/ubuntu-v20-latin-regular.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/ubuntu/ubuntu-v20-latin-regular.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Ubuntu";
        font-style: italic;
        font-weight: 400;
        src: local(""),
          url("./fonts/ubuntu/ubuntu-v20-latin-italic.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/ubuntu/ubuntu-v20-latin-italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Ubuntu";
        font-style: normal;
        font-weight: 500;
        src: local(""),
          url("./fonts/ubuntu/ubuntu-v20-latin-500.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/ubuntu/ubuntu-v20-latin-500.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Ubuntu";
        font-style: normal;
        font-weight: 700;
        src: local(""),
          url("./fonts/ubuntu/ubuntu-v20-latin-700.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/ubuntu/ubuntu-v20-latin-700.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Ubuntu";
        font-style: italic;
        font-weight: 700;
        src: local(""),
          url("./fonts/ubuntu/ubuntu-v20-latin-700italic.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/ubuntu/ubuntu-v20-latin-700italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
    `,
  },
  {
    fontName: "Oswald",
    type: "condensed",
    fontFace: css`
      @font-face {
        font-family: "Oswald";
        font-style: normal;
        font-weight: 400;
        src: local(""),
          url("./fonts/oswald/oswald-v48-latin-regular.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/oswald/oswald-v48-latin-regular.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Oswald";
        font-style: normal;
        font-weight: 500;
        src: local(""),
          url("./fonts/oswald/oswald-v48-latin-500.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/oswald/oswald-v48-latin-500.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Oswald";
        font-style: normal;
        font-weight: 700;
        src: local(""),
          url("./fonts/oswald/oswald-v48-latin-700.woff2") format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/oswald/oswald-v48-latin-700.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
    `,
  },
  {
    fontName: "Roboto Condensed",
    type: "condensed",
    fontFace: css`
      @font-face {
        font-family: "Roboto Condensed";
        font-style: normal;
        font-weight: 400;
        src: local(""),
          url("./fonts/roboto-condensed/roboto-condensed-v25-latin-regular.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/roboto-condensed/roboto-condensed-v25-latin-regular.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Roboto Condensed";
        font-style: italic;
        font-weight: 400;
        src: local(""),
          url("./fonts/roboto-condensed/roboto-condensed-v25-latin-italic.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/roboto-condensed/roboto-condensed-v25-latin-italic.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Roboto Condensed";
        font-style: normal;
        font-weight: 700;
        src: local(""),
          url("./fonts/roboto-condensed/roboto-condensed-v25-latin-700.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/roboto-condensed/roboto-condensed-v25-latin-700.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Roboto Condensed";
        font-style: italic;
        font-weight: 700;
        src: local(""),
          url("./fonts/roboto-condensed/roboto-condensed-v25-latin-700italic.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/roboto-condensed/roboto-condensed-v25-latin-700italic.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
    `,
  },
  {
    fontName: "Ubuntu Condensed",
    type: "condensed",
    fontFace: css`
      @font-face {
        font-family: "Ubuntu Condensed";
        font-style: normal;
        font-weight: 400;
        src: local(""),
          url("./fonts/ubuntu-condensed/ubuntu-condensed-v16-latin-regular.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/ubuntu-condensed/ubuntu-condensed-v16-latin-regular.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
    `,
  },
  {
    fontName: "Serif Default",
    type: "serif",
    fontFace: "",
    altFontName: "",
  },
  {
    fontName: "Georgia",
    type: "serif",
    fontFace: "",
    altFontName: '"Georgia"',
  },
  {
    fontName: "Merriweather",
    type: "serif",
    fontFace: css`
      @font-face {
        font-family: "Merriweather";
        font-style: normal;
        font-weight: 400;
        src: local(""),
          url("./fonts/merriweather/merriweather-v30-latin-regular.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/merriweather/merriweather-v30-latin-regular.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Merriweather";
        font-style: italic;
        font-weight: 400;
        src: local(""),
          url("./fonts/merriweather/merriweather-v30-latin-italic.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/merriweather/merriweather-v30-latin-italic.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Merriweather";
        font-style: normal;
        font-weight: 700;
        src: local(""),
          url("./fonts/merriweather/merriweather-v30-latin-700.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/merriweather/merriweather-v30-latin-700.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      @font-face {
        font-family: "Merriweather";
        font-style: italic;
        font-weight: 700;
        src: local(""),
          url("./fonts/merriweather/merriweather-v30-latin-700italic.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/merriweather/merriweather-v30-latin-700italic.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
    `,
  },
  {
    fontName: "Slabo 27px",
    type: "serif",
    fontFace: css`
      @font-face {
        font-family: "Slabo 27px";
        font-style: normal;
        font-weight: 400;
        src: local(""),
          url("./fonts/slabo-27px/slabo-27px-v12-latin-regular.woff2")
            format("woff2"),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
            url("./fonts/slabo-27px/slabo-27px-v12-latin-regular.woff")
            format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
    `,
  },
  {
    fontName: "Times New Roman",
    type: "serif",
    fontFace: "",
    altFontName: '"Times, Times New Roman"',
  },
  {
    fontName: "Comic Sans",
    type: "comic",
    fontFace: "",
    altFontName: '"Comic Sans MS", "Comic Sans"',
  },
];

const systemStack = `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
"Oxygen", "Ubuntu", "Cantarell", "Droid Sans",
"Helvetica Neue", sans-serif`;

const serifStack = `"Lucida Bright", Lucidabright, "Lucida Serif", Lucida, Constantia, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif;`;

function getFontFace(fontTitle) {
  const font = fonts.find((font) => font.fontName === fontTitle);
  return font.fontFace;
}

function getFontFamily(fontTitle) {
  const font = fonts.find((font) => font.fontName === fontTitle);
  if (!font) {
    return "inherit";
  }
  const fontName = font.fontFace === "" ? font.altFontName : font.fontFace;
  const fontStack = font.serifStack ? serifStack : systemStack;
  return fontName + " " + fontStack;
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
  // ?Sans:
  // System Default
  // Andika
  // Inter
  // Karla
  // Lato
  // Montserrat
  // Open Sans
  // PT Sans
  // Quicksand
  // Roboto
  // Source Sans Pro
  // Ubuntu
  // ?Condensed:
  // Oswald
  // Roboto Condensed
  // Ubuntu condensed
  // ?Serif
  // Serif Default
  // Georgia
  // Merriweather
  // Slabo 27px
  // Times New Roman
  // ?gRaPhIc DeSiGn Is mY pAsSiOn
  // Comic Sans
  const sans = [{ value: "", label: "Sans Fonts:", isdisabled: true }];
  const condensed = [
    { value: "", label: "Condensed Fonts:", isdisabled: true },
  ];
  const serif = [{ value: "", label: "Serif Fonts:", isdisabled: true }];

  fonts.forEach((font) => {
    if (font.type === "sans") {
      sans.push({
        value: font.fontName,
        label: font.fontName,
        //isdisabled: currentFont === font.fontName,
      });
    }
    if (font.type === "condensed") {
      condensed.push({
        value: font.fontName,
        label: font.fontName,
        // isdisabled: currentFont === font.fontName,
      });
    }
    if (font.type === "serif") {
      serif.push({
        value: font.fontName,
        label: font.fontName,
        //isdisabled: currentFont === font.fontName,
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
    },
    {
      value: "Comic Sans",
      label: "Comic Sans",
      // isdisabled: currentFont === "Comic Sans",
    }
  );
}

export { getFontFace, getFontFamily, getFontOptions, getAllFontFaces };
