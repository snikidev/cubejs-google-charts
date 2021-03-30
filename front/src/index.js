import React from "react";
import ReactDOM from "react-dom";
import cubejs from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const cubejsApi = cubejs(process.env.REACT_APP_CUBEJS_TOKEN, {
  apiUrl: `${process.env.REACT_APP_API_URL}/cubejs-api/v1`,
});

ReactDOM.render(
  <React.StrictMode>
    <CubeProvider cubejsApi={cubejsApi}>
      <App />
    </CubeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
