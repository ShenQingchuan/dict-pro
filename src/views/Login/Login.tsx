import React, { useState, useContext, createContext } from "react";
import "./Login.scss";
import {
  Form,
  Checkbox,
  Button,
  Icon,
  Grid,
  Divider,
  Label,
  TransitionablePortal,
  Segment,
  Header,
  Message,
} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import md5 from "md5";
import HTTPRequest from "../../utils/HTTPRequest";
import jwt from "jsonwebtoken";
import { hookSetter, FormContextType, GlobalContextType } from "../../typings";
import { GlobalContext } from "../..";
import { getHashAvatar } from "../../utils/getHashAvatar";

const FormContext = createContext<any>({});

// 自定义校验
function checkResult(r: string) {
  return r === "";
}
function userNameFormatValidate(
  userName: string,
  setValidateResult: hookSetter<string>
) {
  if (!userName.length) {
    setValidateResult("还没有填写用户名！");
    return;
  }
  setValidateResult(
    /^[a-zA-Z0-9_-]{4,16}$/.test(userName)
      ? ""
      : "应为4到16位字母、数字、下划线或短横线"
  );
}
function passwordFormatValidate(
  password: string,
  setValidateResult: hookSetter<string>
) {
  if (!password.length) {
    setValidateResult("还没有填写密码！");
    return;
  }
  setValidateResult(
    /^.*(?=.{6,14})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/.test(password)
      ? ""
      : "应为4到16位，包括至少1个大写字母、1个小写字母、1个数字"
  );
}

let LoginForm = () => {
  // 表单内容
  const {
    userName,
    password,
    showRegisterSuccessTip,
    setUserName,
    setPassword,
  }: FormContextType = useContext(FormContext);

  // 表单校验
  const [userNameValidateResult, setUserNameValidateResult] = useState("");
  const [passwordValidateResult, setPasswordValidateResult] = useState("");

  // 请求响应的错误提示
  const [showPortal, setShowPortal] = useState(false);
  const [portalMessage, setPortalMessage] = useState("");

  const history = useHistory();
  const { setTokenExists, setUserPublicInfo }: GlobalContextType = useContext(
    GlobalContext
  );

  // 登录过程：
  const RequestLogin = async () => {
    const res = await HTTPRequest.post("/login", {
      userName,
      password: md5(password),
    });
    const d = res.data.data;
    if (res.data.code === 100) {
      const decoded: any = jwt.decode(d.token, { complete: true });
      localStorage.setItem("dp_uid", decoded.payload.uid);
      localStorage.setItem("dp_utoken", d.token);
      if (!d.publicInfo.avatarUrl) {
        d.publicInfo.avatarUrl = getHashAvatar(d.userName);
      }
      localStorage.setItem("dp_uinfo", JSON.stringify(d.publicInfo));
      setUserPublicInfo(d.publicInfo);
      setTokenExists(true);

      history.push("/");
    } else {
      setPortalMessage(d.msg);
      setShowPortal(true);
    }
  };

  return (
    <>
      {showRegisterSuccessTip && (
        <Message success>
          <Message.Header>注册成功</Message.Header>
          <p>现在就立刻登录吧！</p>
        </Message>
      )}
      {
        <TransitionablePortal
          closeOnTriggerClick
          openOnTriggerClick
          open={showPortal}
          onHide={() => setShowPortal(false)}
        >
          <Segment
            style={{ left: "20%", position: "fixed", top: "20%", zIndex: 1000 }}
          >
            <Header>
              <Icon color="red" name="exclamation circle" />
              发生错误
            </Header>
            <p>{portalMessage}</p>
          </Segment>
        </TransitionablePortal>
      }
      <Grid.Column>
        <Form>
          <div className="title">
            <Icon name="book"></Icon>
            登录我的专英词库账户
          </div>

          {/* 输入用户名 */}
          <Form.Field>
            <label>用户名</label>
            <input
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                userNameFormatValidate(
                  e.target.value,
                  setUserNameValidateResult
                );
              }}
              placeholder="请输入用户名"
            />
            {userNameValidateResult.length !== 0 ? (
              <Label basic color="red" pointing="above">
                {userNameValidateResult}
              </Label>
            ) : (
              void 0
            )}
          </Form.Field>
          {/* 输入密码 */}
          <Form.Field>
            <label>密码</label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                passwordFormatValidate(
                  e.target.value,
                  setPasswordValidateResult
                );
              }}
              type="password"
              placeholder="请输入密码"
            />
            {passwordValidateResult.length !== 0 ? (
              <Label basic color="red" pointing="above">
                {passwordValidateResult}
              </Label>
            ) : (
              void 0
            )}
          </Form.Field>

          <Form.Field>
            <Checkbox label="在 7 天内记住我" />
          </Form.Field>
          <Button onClick={RequestLogin} color="teal" fluid>
            登录
          </Button>
        </Form>
      </Grid.Column>
    </>
  );
};

let RegisterForm = () => {
  // 表单内容
  const {
    userName,
    password,
    setUserName,
    setPassword,
    setIsLoginForm,
    setShowRegisterSuccessTip,
  }: FormContextType = useContext(FormContext);
  const [, setReinput] = useState("");

  // 表单校验
  const [userNameValidateResult, setUserNameValidateResult] = useState("");
  const [passwordValidateResult, setPasswordValidateResult] = useState("");
  const [reinputValidateResult, setReinputValidateResult] = useState("");

  // 请求响应的错误提示
  const [showPortal, setShowPortal] = useState(false);
  const [portalMessage, setPortalMessage] = useState("");

  // 注册请求
  const RegisterRequest = async () => {
    if (
      checkResult(userNameValidateResult) &&
      checkResult(passwordValidateResult) &&
      checkResult(reinputValidateResult)
    ) {
      const res = await HTTPRequest.post("/user", {
        userName,
        password: md5(password),
      });
      if (res.data.code === 510) {
        setShowPortal(true);
        setPortalMessage(res.data.msg);
        return;
      }
      setIsLoginForm(true);
      setShowRegisterSuccessTip(true);
    } else {
      setShowPortal(true);
      setPortalMessage("请先检查您的输入格式！");
    }
  };

  return (
    <Grid.Column>
      <Form className="form-container">
        <div className="title">
          <Icon name="book"></Icon>
          注册新的专英词典账号
        </div>

        {/* 输入用户名 */}
        <Form.Field>
          <label>用户名</label>
          <input
            onChange={(e) => {
              setUserName(e.target.value);
              userNameFormatValidate(e.target.value, setUserNameValidateResult);
            }}
            placeholder="请输入用户名"
          />
          {userNameValidateResult.length !== 0 ? (
            <Label basic color="red" pointing="above">
              {userNameValidateResult}
            </Label>
          ) : (
            void 0
          )}
        </Form.Field>
        {/* 输入密码 */}
        <Form.Field>
          <label>密码</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
              passwordFormatValidate(e.target.value, setPasswordValidateResult);
            }}
            type="password"
            placeholder="请输入密码"
          />
          {passwordValidateResult.length !== 0 ? (
            <Label basic color="red" pointing="above">
              {passwordValidateResult}
            </Label>
          ) : (
            void 0
          )}
        </Form.Field>
        {/* 确认密码 */}
        <Form.Field>
          <label>确认密码</label>
          <input
            onChange={(e) => {
              setReinput(e.target.value);
              setReinputValidateResult(
                password !== e.target.value ? "两次密码不一致" : ""
              );
            }}
            type="password"
            placeholder="请再次输入密码"
          />
          {reinputValidateResult.length !== 0 ? (
            <Label basic color="red" pointing="above">
              {reinputValidateResult}
            </Label>
          ) : (
            void 0
          )}
        </Form.Field>
        <Button onClick={RegisterRequest} color="teal" fluid>
          注册
        </Button>
        <TransitionablePortal
          closeOnTriggerClick
          openOnTriggerClick
          open={showPortal}
          onHide={() => setShowPortal(false)}
        >
          <Segment
            style={{ left: "20%", position: "fixed", top: "20%", zIndex: 1000 }}
          >
            <Header>
              <Icon color="red" name="exclamation circle" />
              发生错误
            </Header>
            <p>{portalMessage}</p>
          </Segment>
        </TransitionablePortal>
      </Form>
    </Grid.Column>
  );
};

// 登录页面组件
function Login() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showRegisterSuccessTip, setShowRegisterSuccessTip] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <FormContext.Provider
      value={{
        isLoginForm,
        userName,
        password,
        showRegisterSuccessTip,
        setIsLoginForm,
        setUserName,
        setPassword,
        setShowRegisterSuccessTip,
      }}
    >
      <div className="flex-box flex-col jy-center algn-center page-login">
        <Grid className="page-form" columns={3} relaxed="very" stackable>
          <Grid.Column width="8">
            {isLoginForm ? <LoginForm /> : <RegisterForm />}
          </Grid.Column>

          <Grid.Column width="1">
            <Divider vertical> 或者 </Divider>
          </Grid.Column>

          {/* 注册与第三方登录 */}
          <Grid.Column width="6" verticalAlign="middle">
            <Button
              type="primary"
              onClick={() => {
                setIsLoginForm(!isLoginForm);
              }}
            >
              {isLoginForm ? "还没有账号？立即注册！" : "已有账号？立即登录！"}
            </Button>
            <div className="third-party-login">
              <h5>您还可以选择第三方平台账号登录：</h5>

              <div className="flex-box">
                <Button color="blue" icon="qq"></Button>
                <Button color="red" icon="weibo"></Button>
                <Button color="green" icon="weixin"></Button>
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    </FormContext.Provider>
  );
}

export default Login;
