import React, { createContext, useState } from "react";
import "./Home.scss";
import QuickSearch from "../../components/QuickSearch/QuickSearch";
import {
  Divider,
  Container,
  Header,
  Grid,
  Responsive,
} from "semantic-ui-react";
import { WordQueryResult } from "../../typings";

const buildIntroduceGridCard = (
  index: number,
  cover: any,
  title: string,
  description: string
) => (
  <Grid.Column
    mobile={16}
    tablet={8}
    computer={4}
    key={index}
    className="flex-box function-introduce-grid-item"
  >
    <Grid columns={2} verticalAlign="middle">
      <Grid.Column>
        <img src={cover} alt="" />
      </Grid.Column>
      <Grid.Column>
        <div className="function-introduce-grid-item-content">
          <div className="title">{title}</div>
          <div className="description">{description}</div>
        </div>
      </Grid.Column>
    </Grid>
  </Grid.Column>
);
const introduceGridCard = [
  {
    cover: require("../../assets/svgs/search.svg"),
    title: "高效搜索",
    description: "系统会根据你的专业领域，为你推荐相应的单词释义及出处参考。",
  },
  {
    cover: require("../../assets/svgs/books.svg"),
    title: "单词收藏",
    description: "重要的单词当然要放进收藏夹里，这可以影响该翻译方式的排名。",
  },
  {
    cover: require("../../assets/svgs/work-calendar.svg"),
    title: "打卡复习",
    description: "多多复习才能记得更牢，这里绝不只是一个词典而已。",
  },
  {
    cover: require("../../assets/svgs/discuss.svg"),
    title: "参与贡献",
    description: "多本社区秉持开源贡献精神，倡导与用户一同学习与进步。",
  },
];
const HomeGuide = () => {
  return (
    <Container className="home-guide">
      <Header as="h3">
        阅读外语文献时看不懂单词？
        <Responsive {...Responsive.onlyMobile} />
        找不到某个单词在本专业内的翻译方式？
      </Header>
      <div className="sub-title">
        翻译是一件难事儿，但众人拾柴火焰高！
        <Responsive {...Responsive.onlyMobile} />来 DictPro 和大家一起讨论吧！
      </div>
      <Grid
        columns={4}
        className="function-introduce-grid"
        verticalAlign="middle"
      >
        {introduceGridCard.map((e, i) => {
          return buildIntroduceGridCard(i, e.cover, e.title, e.description);
        })}
      </Grid>
    </Container>
  );
};

export const HomeContext = createContext<any>({});

function Home() {
  const [queryResult, setQueryResult] = useState({} as WordQueryResult);

  return (
    <HomeContext.Provider
      value={{
        queryResult,
        setQueryResult,
      }}
    >
      <div className="page-home">
        <QuickSearch />
        <Divider className="after-search-divider" />
        <HomeGuide />
      </div>
    </HomeContext.Provider>
  );
}

export default Home;
