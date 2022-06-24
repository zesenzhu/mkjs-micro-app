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
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log("[react16] react app bootstraped");
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */

export async function mount(props: any) {
  console.log("[react16] props from main framework", props);
  render(props);
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */

export async function unmount(props: any) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  );
}
