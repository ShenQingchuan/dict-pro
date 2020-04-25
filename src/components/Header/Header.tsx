import React, { useContext } from "react";
import "./Header.scss";
import { Image, Dropdown, Label, Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { GlobalContextType } from "../../typings";
import { getHashAvatar } from "../../utils/getHashAvatar";
import { GlobalContext } from "../..";
import logoutAction from "../../utils/logoutActions";

const LoginedHeaderActions = () => {
  const {
    setTokenExists,
    userPublicInfo,
  }: GlobalContextType = useContext(GlobalContext);

  return (
    <>
      <div className="action">单词收藏夹</div>
      <Label as="a" color="teal" className="waiting-for-learning">
        复习
        <Label.Detail>30</Label.Detail>
      </Label>
      <Dropdown className="drop-menu" text="用户中心">
        <Dropdown.Menu>
          <Dropdown.Item>
            <Icon name="bell outline"></Icon>
            通知消息{" "}
            <Label color="red" circular>
              {22}
            </Label>
          </Dropdown.Item>
          <Dropdown.Item>
            <Icon name="gem outline"></Icon>
            会员服务
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => {
              logoutAction();
              setTokenExists(false);
            }}
          >
            <Icon name="log out"></Icon>
            退出登录
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Image
        className="header-avatar"
        src={userPublicInfo.avatarUrl || getHashAvatar(userPublicInfo.userName)}
        avatar
      />
    </>
  );
};

function Header() {
  let history = useHistory();
  const { tokenExists }: GlobalContextType = useContext(GlobalContext);

  return (
    <div className="flex-box algn-center jy-btwn component-header">
      <div
        className="flex-box algn-center logo-container"
        onClick={() => history.push("/")}
      >
        <img
          className="text-logo"
          src={require("../../assets/text-logo.png")}
          alt=""
        />
        专业英语翻译助手
      </div>
      <div className="flex-box algn-center actions-bar">
        <div className="action">我要贡献</div>
        {tokenExists ? (
          <LoginedHeaderActions />
        ) : (
          <Button primary onClick={() => history.push("/login")}>
            登录/注册
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
