import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { globals } from "./styles/globalStyles";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {globals}
    <App />
  </React.StrictMode>
);
