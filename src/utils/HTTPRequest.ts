import axios from "axios";

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

HTTPRequest.interceptors.response.use(
  (response) => {
    if (response.status === 999) {
      localStorage.removeItem("dp_utoken");
      localStorage.removeItem("dp_uid");
      // TODO: 跳转到登录页面，由 Redux Dispatch.
    } // token 已经过期，删除 token 并触发路由跳转到登录页

    return response;
  },
  (err) => {
    console.log(err.data);
    return err;
  }
);

export default HTTPRequest;
