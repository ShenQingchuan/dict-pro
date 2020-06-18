import axios from "axios";
import { message } from "antd";
import logoutAction from "./logoutActions";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.techdict.pro"
    : "http://localhost:7001";
const HTTPRequest = axios.create({
  timeout: 7000,
  baseURL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// 请求预处理
HTTPRequest.interceptors.request.use(
  (request) => {
    if (localStorage.getItem("dp_utoken") != null) {
      request.headers["dp_utoken"] = localStorage.getItem("dp_utoken");
      request.headers["dp_uid"] = localStorage.getItem("dp_uid");
    }
    return request;
  },
  (err) => {
    console.error(err);
    return Promise.resolve(err);
  }
);

// 返回结果处理
HTTPRequest.interceptors.response.use(
  (response) => {
    if (response.data.code === 941) {
      logoutAction();
      window.location.hash = "/login?relogined=1";
      message.warning(response.data.msg);
    } // token 已经过期，删除 token 并触发路由跳转到登录页
    else if (response.data.code === 100 && !response.data.data?.silent) {
      message.success(response.data.msg)
    }

    return response;
  },
  (err) => {
    message.error(String(err));
    return Promise.resolve(err);
  }
);

export default HTTPRequest;
