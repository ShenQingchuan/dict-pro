import React, { useState } from "react";
import "./Login.scss";
import {
  Form,
  Checkbox,
  Button,
  Icon,
  Grid,
  Divider,
  Label,
} from "semantic-ui-react";

type ValidateSetter = React.Dispatch<React.SetStateAction<string>>;

// 自定义校验 Hooks
function userNameFormatValidate(
  userName: string,
  setValidateResult: ValidateSetter
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
  setValidateResult: ValidateSetter
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
  const [userName, setUserName] = useState("");
  const [passowrd, setPassowrd] = useState("");

  // 表单校验
  const [userNameValidateResult, setUserNameValidateResult] = useState("");
  const [passwordValidateResult, setPasswordValidateResult] = useState("");

  return (
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
              setPassowrd(e.target.value);
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

        <Form.Field>
          <Checkbox label="在 7 天内记住我" />
        </Form.Field>
        <Button type="submit" color="teal" fluid>
          登录
        </Button>
      </Form>
    </Grid.Column>
  );
};
let RegisterForm = () => {
  // 表单内容
  const [userName, setUserName] = useState("");
  const [passowrd, setPassowrd] = useState("");
  const [reinput, setReinput] = useState("");

  // 表单校验
  const [userNameValidateResult, setUserNameValidateResult] = useState("");
  const [passwordValidateResult, setPasswordValidateResult] = useState("");
  const [reinputValidateResult, setReinputValidateResult] = useState("");

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
              setPassowrd(e.target.value);
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
                passowrd !== e.target.value ? "两次密码不一致" : ""
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
        <Button type="submit" color="teal" fluid>
          注册
        </Button>
      </Form>
    </Grid.Column>
  );
};

// 登录页面组件
function Login() {
  const [isLoginForm, triggerFormChange] = useState(true);

  return (
    <div className="flex-box flex-col jy-center algn-center page-login">
      <Grid className="login-form" columns={3} relaxed="very" stackable>
        <Grid.Column width="10">
          {isLoginForm ? <LoginForm /> : <RegisterForm />}
        </Grid.Column>

        <Grid.Column width="1">
          <Divider vertical> 或者 </Divider>
        </Grid.Column>

        {/* 注册与第三方登录 */}
        <Grid.Column width="5" verticalAlign="middle">
          <Button
            type="primary"
            onClick={() => {
              triggerFormChange(!isLoginForm);
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
  );
}

export default Login;
