import styled from "@emotion/styled";

const staticSizes = {
  font: {
    h6n: "0.67",
    h5n: "0.83",
    pn: "1",
    h4n: "1",
    default: "1em",
    h3n: "1.17",
    h2n: "1.5",
    h1n: "2",
    xs: "0.67em",
    sm: "0.83em",
    md: "1em",
    lg: "1.17em",
    xl: "1.5em",
    xxl: "2em",
  },
  radius: "5px",
  minHeight: "44px",
  rtPadding: "padding: 10px 10px 0 10px;",
  smMaxHeight: "150px",
};

const mixins = {
  transition: (type = "all", time = 100, curve = "ease-in") => {
    const s = type.concat(" ", time, "ms ", curve, ";");
    return "transition: ".concat(s, "\n", "-webkit-transition: ", s);
  },
  // prettier-ignore
  backgroundGradient: (primary, secondary) => {
    return (
      "background: -webkit-linear-gradient(110deg, " + primary + " 65%, " + secondary + " 65%);" +
      "background: -o-linear-gradient(110deg, " + primary + " 65%, " + secondary + " 65%);" +
      "background: -moz-linear-gradient(110deg, " + primary + " 65%, " + secondary + " 65% );" +
      "background: linear-gradient(110deg, " + primary + " 65%, " + secondary + " 65%);"
    );
  },
  fixedEm: (n) => n * 16 + "px",
};

const baseTypes = {};

// baseTypes aka fancy classes:
baseTypes.hover = "&:hover, &:active, &:focus, &:focus-visible";

baseTypes.MainContent = styled.div`
  margin: 0 auto;
  padding: 0 10px;
  @media screen and (min-width: ${(props) => props.theme.sizes.screenLg}) {
    padding: 0 20px;
    width: ${(props) => props.theme.sizes.maxWidth};
  }
`;

baseTypes.ModalField = styled.input`
  background: ${(props) => props.theme.colors.primary};
  max-width: ${(props) => props.theme.sizes.mdCol};
  font-size: ${staticSizes.font.lg};
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  &:hover {
    background-color: ${(props) => props.theme.colors.reverseFieldHover};
  }
`;

baseTypes.FieldHelperText = styled.div`
  display: block;
  max-width: ${(props) => props.theme.sizes.mdCol};
  width: 100%;
  color: ${(props) => props.theme.colors.placeholder};
  text-align: left;
  font-size: ${staticSizes.font.sm};
  min-height: 20px;
  margin: 0;
`;

baseTypes.Label = styled.label`
  font-size: ${staticSizes.font.md};
  color: ${(props) => props.theme.colors.white};
  font-weight: 700;
  max-width: ${(props) => props.theme.sizes.mdCol};
  width: 100%;
`;

baseTypes.DefaultBtn = styled.button`
  background-color: ${(props) => props.theme.colors.highlight};
  font-size: ${staticSizes.font.md};
  color: ${(props) => props.theme.colors.white};
  ${baseTypes.hover} {
    background-color: ${(props) => props.theme.colors.highlightHover};
  }
  &:visited {
    color: ${(props) => props.theme.colors.white};
  }
  &:disabled {
    color: ${(props) => props.theme.colors.inactiveColor};
    background-color: ${(props) => props.theme.colors.primary};
  }
  position: relative;
  svg {
    position: absolute;
  }
`;

export { baseTypes, staticSizes, mixins };
