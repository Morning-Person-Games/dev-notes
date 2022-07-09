import React from "react";
import styled from "@emotion/styled";
//import { theme } from "../../globalStyles";

// styling
//const { sizes } = theme;

const Wrapper = styled.div`
  display: block;
  width: 100%;
`;

function SettingsContent() {
  return (
    <Wrapper>
      <label>Theme</label>
      <select>
        <option value="default">Default</option>
        <option value="default">Light</option>
      </select>
    </Wrapper>
  );
}

export default SettingsContent;
