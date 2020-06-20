import React, { useContext } from "react";
import "./Header.scss";
import {
  Image,
  Dropdown,
  Label,
  Button,
  Icon,
  Responsive,
} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { GlobalContextType } from "../../typings";
import { GlobalContext } from "../..";
import logoutAction from "../../utils/logoutActions";

const LoginedHeaderActions = () => {
  const {
    setTokenExists,
    userPublicInfo,
    needHit,
  }: GlobalContextType = useContext(GlobalContext);

  const dropDownMenu = (
    <Dropdown.Menu>
      <Dropdown.Item>
        <Icon name="file alternate outline" />
        个人资料
      </Dropdown.Item>
      <Dropdown.Item>
        <Icon name="bell outline" />
        通知消息{" "}
        <Label color="red" circular>
          {22}
        </Label>
      </Dropdown.Item>
      <Dropdown.Item>
        <Icon name="gem outline" />
        会员服务
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        onClick={() => {
          logoutAction();
          setTokenExists(false);
        }}
      >
        <Icon name="log out" />
        退出登录
      </Dropdown.Item>
    </Dropdown.Menu>
  );
  const avatarComponent = (
    <Image className="header-avatar" src={userPublicInfo.avatarUrl} avatar />
  );

  return (
    <>
      <Responsive
        minWidth={Responsive.onlyMobile.minWidth}
        maxWidth={Responsive.onlyLargeScreen.maxWidth}
      >
        {needHit && needHit > 0 && (
          <Label as="a" color="teal" className="waiting-for-review">
            复习
            <Label.Detail>{needHit}</Label.Detail>
          </Label>
        )}
      </Responsive>
      <Responsive
        minWidth={Responsive.onlyTablet.minWidth}
        maxWidth={Responsive.onlyLargeScreen.maxWidth}
      >
        <Dropdown className="drop-menu" text="用户中心">
          {dropDownMenu}
        </Dropdown>
        {avatarComponent}
      </Responsive>
      <Responsive {...Responsive.onlyMobile}>
        <Dropdown
          className="drop-menu"
          text="用户中心"
          trigger={avatarComponent}
          pointing="top right"
          icon={null}
        >
          {dropDownMenu}
        </Dropdown>
      </Responsive>
    </>
  );
};

function Header() {
  let history = useHistory();
  const { tokenExists }: GlobalContextType = useContext(GlobalContext);

  return (
    <div className="flex algn-center jy-btwn component-header">
      <div
        className="flex algn-center logo-container"
        onClick={() => history.push("/")}
      >
        <img
          className="text-logo"
          src={require("../../assets/text-logo.png")}
          alt=""
        />
        <Responsive
          minWidth={Responsive.onlyTablet.minWidth}
          maxWidth={Responsive.onlyLargeScreen.maxWidth}
        >
          <span>专业英语翻译助手</span>
        </Responsive>
      </div>
      <div className="flex algn-center actions-bar">
        <Responsive
          className="flex algn-center"
          minWidth={Responsive.onlyTablet.minWidth}
          maxWidth={Responsive.onlyLargeScreen.maxWidth}
        >
          <div className="action">我要贡献</div>
          <div className="action" onClick={() => history.push("/collection")}>
            单词收藏夹
          </div>
        </Responsive>
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
