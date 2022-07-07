import ContentLoader from "react-content-loader";

const speed = 2;
const backgroundColor = "rgb(36, 40, 85)";
const foregroundColor = "#313ea4";
function LoadingDisplay() {
  const browserWidth = window.innerWidth;
  // screenSm
  if (browserWidth < 630) {
    return (
      <div style={{ display: "block", width: "100%" }}>
        <SmallLoader
          speed={speed}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
        />
      </div>
    );
  }
  // screemMd - two columns
  if (browserWidth < 950) {
    return (
      <div style={{ display: "block", width: "100%" }}>
        <MidLoader
          speed={speed}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
        />
      </div>
    );
  }
  // screenLg +
  return (
    <div style={{ display: "block", width: "100%" }}>
      <DefaultLoader
        speed={speed}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
      />
    </div>
  );
}

export default LoadingDisplay;

function SmallLoader({ ...props }) {
  return (
    <ContentLoader
      style={{ width: "100%" }}
      {...props}
      height="770"
      width="300"
      viewBox="0 0 300 770"
    >
      <rect x="0" y="20" rx="5" ry="5" width="70" height="26" />
      <rect x="80" y="20" rx="5" ry="5" width="120" height="26" />
      <rect x="210" y="20" rx="5" ry="5" width="90" height="26" />
      <rect x="0" y="65" rx="5" ry="5" width="300" height="50" />
      <rect x="0" y="120" rx="5" ry="5" width="300" height="50" />
      <rect x="0" y="175" rx="5" ry="5" width="300" height="180" />
      <rect x="0" y="360" rx="5" ry="5" width="300" height="45" />
      <rect x="0" y="415" rx="5" ry="5" width="300" height="45" />
      <rect x="0" y="470" rx="5" ry="5" width="170" height="45" />
      <rect x="180" y="470" rx="5" ry="5" width="70" height="45" />
      <rect x="260" y="470" rx="5" ry="5" width="70" height="45" />
      <rect x="0" y="525" rx="5" ry="5" width="300" height="245" />
    </ContentLoader>
  );
}

function MidLoader({ ...props }) {
  return (
    <ContentLoader
      style={{ width: "100%" }}
      {...props}
      height="770"
      width="610"
      viewBox="0 0 610 770"
    >
      <rect x="0" y="20" rx="5" ry="5" width="70" height="26" />
      <rect x="80" y="20" rx="5" ry="5" width="120" height="26" />
      <rect x="210" y="20" rx="5" ry="5" width="90" height="26" />
      <rect x="0" y="65" rx="5" ry="5" width="610" height="50" />
      <rect x="0" y="120" rx="5" ry="5" width="610" height="50" />
      <rect x="0" y="175" rx="5" ry="5" width="610" height="180" />
      <rect x="0" y="360" rx="5" ry="5" width="610" height="45" />
      <rect x="0" y="415" rx="5" ry="5" width="140" height="45" />
      <rect x="150" y="415" rx="5" ry="5" width="340" height="45" />
      <rect x="500" y="415" rx="5" ry="5" width="50" height="45" />
      <rect x="560" y="415" rx="5" ry="5" width="50" height="45" />
      <rect x="0" y="470" rx="5" ry="5" width="300" height="300" />
      <rect x="310" y="470" rx="5" ry="5" width="300" height="300" />
    </ContentLoader>
  );
}

function DefaultLoader({ ...props }) {
  return (
    <ContentLoader
      style={{ width: "100%" }}
      {...props}
      height="770"
      width="910"
      viewBox="0 0 910 770"
    >
      <rect x="0" y="20" rx="5" ry="5" width="70" height="26" />
      <rect x="80" y="20" rx="5" ry="5" width="120" height="26" />
      <rect x="210" y="20" rx="5" ry="5" width="90" height="26" />
      <rect x="0" y="65" rx="5" ry="5" width="910" height="50" />
      <rect x="0" y="120" rx="5" ry="5" width="910" height="50" />
      <rect x="0" y="175" rx="5" ry="5" width="910" height="180" />
      <rect x="0" y="360" rx="5" ry="5" width="910" height="45" />
      <rect x="0" y="415" rx="5" ry="5" width="140" height="45" />
      <rect x="150" y="415" rx="5" ry="5" width="640" height="45" />
      <rect x="800" y="415" rx="5" ry="5" width="50" height="45" />
      <rect x="860" y="415" rx="5" ry="5" width="50" height="45" />
      <rect x="0" y="470" rx="5" ry="5" width="450" height="300" />
      <rect x="460" y="470" rx="5" ry="5" width="450" height="300" />
    </ContentLoader>
  );
}
