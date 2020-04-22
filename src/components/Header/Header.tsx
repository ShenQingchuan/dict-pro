import React, { useState } from "react";
import "./Header.scss";
import { Image, Dropdown, Label, Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const mockAvatarUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR-24zVWocAtJ1XfNwy_Dik0UL-RATVgHHaDpCj-VyBvxlE_C5u&usqp=CAU";

function Header() {
  const [authed] = useState(localStorage.getItem("dictPro-auth"));
  let history = useHistory();

  return (
    <div className="flex-box algn-center jy-btwn component-header">
      <div
        className="flex-box algn-center logo"
        onClick={() => history.push("/")}
      >
        <img src={require("../../logo.png")} alt="" />
        Dict Pro - 专业英语翻译助手
      </div>
      <div className="flex-box algn-center actions-bar">
        <div className="action">我要贡献</div>
        {authed === "1" && <div className="action">单词收藏夹</div>}
        {authed === "1" && (
          <Label as="a" color="teal" className="waiting-for-learning">
            复习
            <Label.Detail>30</Label.Detail>
          </Label>
        )}
        {authed === "1" ? (
          <Dropdown className="drop-menu" text="用户中心">
            <Dropdown.Menu>
              <Dropdown.Item>
                <Icon name="bell outline"></Icon>
                通知消息
              </Dropdown.Item>
              <Dropdown.Item>
                <Icon name="gem outline"></Icon>
                会员服务
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <Icon name="log out"></Icon>
                退出登录
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Button primary onClick={() => history.push("/login")}>
            登录/注册
          </Button>
        )}
        {authed === "1" ? (
          <Image className="header-avatar" src={mockAvatarUrl} avatar />
        ) : (
          void 0
        )}
      </div>
    </div>
  );
}

export default Header;
