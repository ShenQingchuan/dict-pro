import "./Collection.scss";

import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Container,
  Header,
  List,
  Input,
  Button,
  Icon,
  Responsive,
  Pagination,
} from "semantic-ui-react";
import HTTPRequest from "../../utils/HTTPRequest";
import { WordQueryResult, GlobalContextType } from "../../typings";
import { GlobalContext } from "../..";

const isReviewed = (last: string, create: string, now: Date) =>
  new Date(last).getDate() === now.getDate() && last !== create;
type WordItemPropType = {
  word: {
    item: WordQueryResult;
    createTime: string;
    lastHitTime: string;
  };
  index: number;
  handleDelete: (i: number) => void;
};
function WordItem(prop: WordItemPropType) {
  const hitTime = new Date();
  const [word, setWord] = useState(prop.word);
  let [reviewed, setReviewed] = useState(
    isReviewed(word.lastHitTime, word.createTime, hitTime)
  );
  const { needHit, setNeedHit }: GlobalContextType = useContext(GlobalContext);

  const hitWord = async () => {
    const res = await HTTPRequest.put("/hit", {
      wordId: word.item._id,
      hitTime: hitTime.toISOString(),
    });
    if (res.data.code === 100) {
      setReviewed(true); // 已打卡
      setNeedHit(needHit - 1);
      setWord({ ...word, lastHitTime: hitTime.toISOString() });
    }
  };

  const deleteWord = async () => {
    await HTTPRequest.delete("/collect", {
      data: {
        wordId: word.item._id,
      },
    });
    prop.handleDelete(prop.index);
  };

  return (
    <List.Item className="word-list-item">
      <List.Content
        floated="left"
        className={`item-left ${reviewed ? "reviewed-shadow" : ""}`}
      >
        <List.Header as="a" className="word-itself">
          {word.item.word}
        </List.Header>
        <List.Description className="word-desc">
          {word.item.translation.map((e) => (
            <div key={e}>
              <span>{e}</span> <br />
            </div>
          ))}
        </List.Description>
      </List.Content>
      <List.Content
        floated="right"
        className="item-right flex flex-col algn-center"
      >
        <div className="flex algn-center jy-end">
          <Button
            icon
            onClick={hitWord}
            className="flex item-action"
            color="yellow"
            disabled={reviewed}
          >
            <Icon name="key" />
            <Responsive
              className="m-l-10"
              as={Button.Content}
              minWidth={Responsive.onlyComputer.minWidth}
              maxWidth={Responsive.onlyLargeScreen.maxWidth}
            >
              {reviewed ? "今日已打卡" : "打卡"}
            </Responsive>
          </Button>
          <Button icon className="flex item-action" color="teal">
            <Icon name="sticky note outline" />
            <Responsive
              className="m-l-10"
              as={Button.Content}
              minWidth={Responsive.onlyComputer.minWidth}
              maxWidth={Responsive.onlyLargeScreen.maxWidth}
            >
              写笔记
            </Responsive>
          </Button>
          <Button
            onClick={deleteWord}
            icon
            className="flex item-action"
            color="red"
          >
            <Icon name="trash alternate outline" />
            <Responsive
              className="m-l-10"
              as={Button.Content}
              minWidth={Responsive.onlyComputer.minWidth}
              maxWidth={Responsive.onlyLargeScreen.maxWidth}
            >
              删除
            </Responsive>
          </Button>
        </div>
        <div className="collect-time flex algn-center">
          收藏于 {new Date(word.createTime).toLocaleString("zh")}
        </div>
        <div className="last-hit-time flex algn-center">
          上次打卡 {new Date(word.lastHitTime).toLocaleString("zh")}
        </div>
      </List.Content>
    </List.Item>
  );
}

type CollectionItem = {
  item: WordQueryResult;
  createTime: string;
  lastHitTime: string;
};
function getTotalPageCount(size: number) {
  return Math.ceil(size / 10);
}
const collectionsCache: { [page: number]: CollectionItem[] } = {};
function Collection() {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const requestByPage = useCallback(async (page: number) => {
    if (!collectionsCache[page]) {
      const res = await HTTPRequest.get(`/collections?page=${page}`);
      setCollections(res?.data?.data?.collections);
      setTotalPage(getTotalPageCount(res?.data?.data?.total));
      // 缓存数据：
      collectionsCache[page] = res?.data?.data?.collections;
    } else {
      // 读取缓存：
      setCollections(collectionsCache[page]);
    }
  }, []);

  // useEffect => mounted & updated:
  useEffect(() => {
    (async () => {
      await requestByPage(page);
    })();
  }, [page, requestByPage]);

  /** 从缓存中删除的重排算法 */
  const DeleteFromCache = async (i: number) => {
    collectionsCache[page].splice(i, 1);
    for (let i = page; i < totalPage; i++) {
      if (!collectionsCache[i + 1]) {
        await requestByPage(i + 1);
      }
      collectionsCache[i + 1].length &&
        collectionsCache[i].push(...collectionsCache[i + 1].splice(0, 1));
    }
    if (!collectionsCache[totalPage]?.length) {
      setTotalPage(totalPage - 1);
    }
    setCollections([...collectionsCache[page]]);
  };

  // render:
  return (
    <div className="page-collection">
      <Header as="h1">我的单词收藏夹</Header>
      <Input
        className="search-bar"
        action="在收藏夹中搜索"
        placeholder="请输入您要查询的单词"
      />
      <Container className="word-list-container">
        <List divided relaxed selection>
          {collections.length &&
            collections.map((e, i) => (
              <WordItem
                key={e.item.id}
                word={e}
                index={i}
                handleDelete={(i) => {
                  DeleteFromCache(i);
                }}
              />
            ))}
        </List>
        <Pagination
          onPageChange={(e, data) => {
            if (typeof data.activePage === "number") {
              setPage(data.activePage);
            }
          }}
          defaultActivePage={1}
          totalPages={totalPage}
        />
      </Container>
    </div>
  );
}

export default Collection;
