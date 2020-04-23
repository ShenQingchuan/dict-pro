import React from "react";
import "./QuickSearch.scss";
import { Header, Input } from "semantic-ui-react";

function QuickSearch() {
  return (
    <div className="flex-box flex-col jy-center algn-center component-quick-search">
      <img className="logo" src={require("../../assets/logo.png")} alt="" />
      <Header as="h2">
        快搜一下你想查的单词吧！
        <Header.Subheader className="sub-header">
          我们致力于寻找单词在专业用途中最契合的翻译方式
        </Header.Subheader>
      </Header>
      <Input
        className="search-inputer"
        action="查询"
        placeholder="输入你想搜索的单词..."
      />
    </div>
  );
}

export default QuickSearch;
