import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for React 18+
import App from "./App";
import "./styles/index.css";
import './styles.css';

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
