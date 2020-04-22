import React, { useState } from "react";
import "./Login.scss";
import { Form, Checkbox, Button, Icon, Grid, Divider } from "semantic-ui-react";

const loginForm = (
  <Grid.Column>
    <Form>
      <div className="title">
        <Icon name="book"></Icon>
        登录我的专英词库账户
      </div>

      <Form.Field>
        <label>用户名</label>
        <input placeholder="请输入用户名" />
      </Form.Field>
      <Form.Field>
        <label>密码</label>
        <input placeholder="请输入密码" />
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

const registerForm = (
  <Grid.Column>
    <Form>
      <div className="title">
        <Icon name="book"></Icon>
        注册新的专英词典账号
      </div>

      <Form.Field>
        <label>用户名</label>
        <input placeholder="请输入用户名" />
      </Form.Field>
      <Form.Field>
        <label>密码</label>
        <input placeholder="请输入密码" />
      </Form.Field>
      <Form.Field>
        <label>确认密码</label>
        <input placeholder="请再次输入密码" />
      </Form.Field>
      <Button type="submit" color="teal" fluid>
        注册
      </Button>
    </Form>
  </Grid.Column>
);

function Login() {
  const [isLoginForm, triggerFormChange] = useState(true);

  return (
    <div className="flex-box flex-col jy-center algn-center page-login">
      <Grid className="login-form" columns={3} relaxed="very" stackable>
        {isLoginForm ? loginForm : registerForm}

        <Grid.Column>
          <Divider vertical> 或者 </Divider>
        </Grid.Column>

        {/* 注册与第三方登录 */}
        <Grid.Column verticalAlign="middle">
          <Button
            type="primary"
            onClick={() => triggerFormChange(!isLoginForm)}
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
