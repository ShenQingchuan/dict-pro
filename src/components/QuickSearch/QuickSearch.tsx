import React, { useContext, useState } from "react";
import "./QuickSearch.scss";
import {
  Header,
  Input,
  Card,
  Transition,
  Button,
  Message,
  Label,
} from "semantic-ui-react";
import { HomeContext } from "../../views/Home/Home";
import HTTPRequest from "../../utils/HTTPRequest";
import { HomeContextType } from "../../typings";

function QuickSearch() {
  const [word, setWord] = useState("");
  const [tip, setTip] = useState("");
  const [showTip, setShowTip] = useState(false);

  const { queryResult, setQueryResult }: HomeContextType = useContext(
    HomeContext
  );

  const displayTip = (msg: string) => {
    setTip(msg);
    setShowTip(true);
    setTimeout(() => {
      setShowTip(false);
    }, 2000);
  };

  const submitQuery = async () => {
    if (word.length === 0) {
      // 显示错误提示
      displayTip("请输入您要查询的单词！");
      return;
    }

    const res = await HTTPRequest.get(`/query?word=${word}`);
    const rd = res.data.data;
    console.log(rd.result);
    if (rd.result) {
      setQueryResult(rd.result);
    }
  };

  return (
    <div className="flex-box flex-col jy-center algn-center component-quick-search">
      <img className="logo" src={require("../../assets/logo.png")} alt="" />
      <Transition
        visible={showTip}
        unmountOnHide
        animation="fade"
        duration={50}
      >
        <Message warning header={tip} />
      </Transition>
      <Header as="h2">
        快搜一下你想查的单词吧！
        <Header.Subheader className="sub-header">
          我们致力于寻找单词在专业用途中最契合的翻译方式
        </Header.Subheader>
      </Header>
      <Input
        onChange={(e) => {
          setWord(e.target.value);
        }}
        className="search-inputer"
        action={<Button onClick={submitQuery}>查询</Button>}
        placeholder="输入你想搜索的单词..."
      />
      <Transition
        visible={queryResult.id !== undefined}
        unmountOnHide
        animation="fade"
        duration={400}
      >
        <Card className="query-card">
          <Card.Content>
            <Card.Header className="query-header flex-box">
              <div className="word">{queryResult?.word}</div>
              <span>/{queryResult?.phonetic}/</span>
            </Card.Header>
            <Card.Meta className="query-meta">
              {queryResult?.translation?.map((e) => (
                <>
                  <span>{e}</span> <br />
                </>
              ))}
            </Card.Meta>
            {typeof queryResult?.tag !== "string" && (
              <Card.Description className="tags">
                <label>所属标签：</label>
                <br />
                {queryResult?.tag?.map((t) => (
                  <Label basic size="tiny" color="blue">
                    {t}
                  </Label>
                ))}
              </Card.Description>
            )}
          </Card.Content>
        </Card>
      </Transition>
    </div>
  );
}

export default QuickSearch;
