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
  Icon,
} from "semantic-ui-react";
import { HomeContext } from "../../views/Home/Home";
import HTTPRequest from "../../utils/HTTPRequest";
import { HomeContextType, WordQueryResult } from "../../typings";

type WordCardPropType = {
  showContent: boolean;
};
function WordCard(prop: WordCardPropType) {
  const { queryResult }: HomeContextType = useContext(HomeContext);
  const { showContent } = prop;

  // 收藏单词的请求
  const submitCollect = async () => {
    await HTTPRequest.post(`/collect`, {
      wordId: queryResult?.id,
      word: queryResult?.word,
    });
  };

  return (
    <Transition
      visible={queryResult.id !== undefined || showContent}
      unmountOnHide
      animation="fade"
      duration={400}
    >
      <Card className="query-card">
        <Card.Content>
          <Card.Header className="query-header flex-box">
            <div className="word">
              {queryResult?.word ?? "暂未查询到该单词！"}
            </div>
            <span>
              {queryResult.phonetic
                ? `/ ${queryResult?.phonetic} /`
                : "请确认您输入到是否为英语"}
            </span>
          </Card.Header>
          <Card.Meta className="query-meta">
            {queryResult?.translation?.map((e) => (
              <div key={e}>
                <span>{e}</span> <br />
              </div>
            ))}
          </Card.Meta>
          {typeof queryResult?.tag !== "string" && !showContent && (
            <Card.Description className="tags">
              <label>所属标签：</label>
              <br />
              {queryResult?.tag?.map((t) => (
                <Label key={t} basic size="tiny" color="blue">
                  {t}
                </Label>
              ))}
            </Card.Description>
          )}
          <div className="query-actions flex jy-end algn-center tb-gap">
            <Button className="lr-gap" primary>
              查看详情
            </Button>
            <Button
              onClick={submitCollect}
              className="lr-gap"
              icon
              labelPosition="left"
              color="yellow"
            >
              <Icon name="star" />
              收藏
            </Button>
          </div>
        </Card.Content>
      </Card>
    </Transition>
  );
}

function QuickSearch() {
  const [word, setWord] = useState("");
  const [forceShowCardContent, setForceShowCardContent] = useState(false);
  const [tip, setTip] = useState("");
  const [showTip, setShowTip] = useState(false);

  const { setQueryResult }: HomeContextType = useContext(HomeContext);

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
    if (rd?.result) {
      setQueryResult(rd.result);
    } else {
      setForceShowCardContent(true);
      setQueryResult({} as WordQueryResult); // 重设查询结果
    }
  };

  return (
    <div
      className="flex flex-col jy-center algn-center component-quick-search"
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          submitQuery()
        }
      }}
    >
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
      <WordCard showContent={forceShowCardContent} />
    </div>
  );
}

export default QuickSearch;
