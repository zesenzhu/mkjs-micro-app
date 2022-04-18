import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
declare global {
  interface Window {
    __POWERED_BY_QIANKUN__: any;
  }
}
reportWebVitals();

function render(props: any) {
  const { container } = props;
  console.log("微应用", window?.__POWERED_BY_QIANKUN__);
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter
        basename={window?.__POWERED_BY_QIANKUN__ ? "/micro_react" : "/"}
      >
        <App />
      </BrowserRouter>
    </React.StrictMode>,
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  );
}

if (!window?.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log("[react16] react app bootstraped");
}

export async function mount(props: any) {
  console.log("[react16] props from main framework", props);
  render(props);
}

export async function unmount(props: any) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  );
}
