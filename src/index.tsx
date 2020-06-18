import React, { createContext, useState } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GlobalContextType } from "./typings";
import HTTPRequest from "./utils/HTTPRequest";

// 全局上下文 作状态管理用
export const GlobalContext = createContext<any>({});

const GlobalStoredApp = () => {
  // App 全局状态
  const [tokenExists, setTokenExists] = useState(
    localStorage.getItem("dp_utoken") !== null
  );
  window.addEventListener("hashchange", () => {
    const newHash = window.location.hash;
    const hashParts = newHash.split("?");
    if ((hashParts[0] === "#/login", hashParts[1] === "relogined=1")) {
      setTokenExists(false);
    }
  });

  // 还需复习打卡的单词数量
  const [needHit, setNeedHit] = useState(0);
  HTTPRequest.get("/hitCount").then((res) => {
    setNeedHit(res?.data.data?.needHit);
  });

  let userInfoStr = localStorage.getItem("dp_uinfo")!;
  const [userPublicInfo, setUserPublicInfo] = useState(
    (userInfoStr !== null ? JSON.parse(userInfoStr) : {}) as GlobalContextType
  );

  return (
    <GlobalContext.Provider
      value={{
        // 模拟的 React 全局根节点 Redux - 只提供了 值与其Setter
        tokenExists,
        setTokenExists,
        userPublicInfo,
        setUserPublicInfo,
        needHit,
        setNeedHit,
      }}
    >
      <App />
    </GlobalContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <GlobalStoredApp />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
