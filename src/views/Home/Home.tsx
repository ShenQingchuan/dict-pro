import React from "react";
import "./Home.scss";
import QuickSearch from "../../components/QuickSearch/QuickSearch";
import { Divider, Container, Header, Grid } from "semantic-ui-react";

const buildIntroduceGridCard = (
  cover: any,
  title: string,
  description: string
) => (
  <Grid.Column className="flex-box function-introduce-grid-item">
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
        阅读外语文献时看不懂单词？找不到某个单词在本专业内的翻译方式？
      </Header>
      <div className="sub-title">
        翻译是一件难事儿，但众人拾柴火焰高，来 DictPro 和大家一起讨论吧！
      </div>
      <Grid
        columns={4}
        className="function-introduce-grid"
        verticalAlign="middle"
      >
        {introduceGridCard.map((e) =>
          buildIntroduceGridCard(e.cover, e.title, e.description)
        )}
      </Grid>
    </Container>
  );
};

function Home() {
  return (
    <div className="page-home">
      <QuickSearch />
      <Divider className="after-search-divider" />
      <HomeGuide />
    </div>
  );
}

export default Home;
