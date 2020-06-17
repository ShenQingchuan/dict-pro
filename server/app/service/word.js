'use strict';

const Service = require('egg').Service;
const HTTPResponse = require('../utils/HTTPResponse');
const { wordTagMap, wordExchangeMap, findChapter } = require('../utils/WordsUtils');

class WordService extends Service {
  async queryWordService() {
    const word = this.ctx.query && this.ctx.query.word;
    const chapter = `Dictionary${word[0].toUpperCase()}`;
    const found = await this.ctx.model[chapter].findOne({
      word,
    });

    if (found) {
      // 对返回结果做处理
      const result = Object.assign({}, found._doc, {
        definition: found.definition.split('\n'),
        translation: found.translation.split('\n'),
        tag: found.tag !== '' ? found.tag.split(' ').map(t => (wordTagMap[t] ? wordTagMap[t] : t)) : '',
        exchange: found.exchange.split('/').map(e =>
          (wordExchangeMap[e[0]] ? (`${wordExchangeMap[e[0]]}: ` + e.slice(2)) : e)
        ),
      });

      this.ctx.body = HTTPResponse(100, '已查询到单词。', {
        result,
      });
    } else {
      this.ctx.body = HTTPResponse(930, '未查询到单词', null);
    }
  }
  async addToOwnCollection() {
    const wordId = this.ctx.request.body.wordId;
    const word = this.ctx.request.body.word;
    if (!wordId || !word) {
      this.ctx.body = HTTPResponse(936, '需要提供收藏目标单词 word 与其 wordId！', null);
      return;
    }
    if (!this.ctx.header.dp_uid) {
      this.ctx.body = HTTPResponse(935, '需要提供收藏用户的 ID！', null);
      return;
    }
    const chapter = findChapter(word);
    const foundWord = await this.ctx.model[chapter].findOne({
      word,
    });

    const foundCollection = await this.ctx.model.Collection.findOne({
      userId: this.ctx.header.dp_uid,
    });
    const now = Date.now();
    if (foundCollection === null) {
      // 说明用户还没有创建过 收藏夹
      const newCollectionForThisUser = new this.ctx.model.Collection({
        userId: this.ctx.header.dp_uid,
        collections: [{
          wordId: foundWord._id,
          wordChapter: chapter,
          createTime: now,
          lastHitTime: now,
        }],
      });
      const theNewCollection = await newCollectionForThisUser.save();

      this.ctx.body = HTTPResponse(100, '成功添加到收藏夹', {
        newCollection: theNewCollection,
      });
    } else { // 说明之前已经创建过收藏夹，直接添加进收藏夹
      let foundCollection = await this.ctx.model.Collection.findOne({
        userId: this.ctx.header.dp_uid,
        'collections.wordId': foundWord._id,
      }); // 这里是为了查询到本用户的收藏夹中是否有该单词

      if (foundCollection === null) {
        foundCollection = await this.ctx.model.Collection.findOne({
          userId: this.ctx.header.dp_uid,
        });
        foundCollection.collections.push({
          wordId: foundWord._id,
          wordChapter: chapter,
          createTime: now,
          lastHitTime: now,
        });
        const theNewCollection = await foundCollection.save();
        theNewCollection.collections = undefined; // 去掉收藏的单词数组，没有必要返回它，占用带宽。
        this.ctx.body = HTTPResponse(100, '成功添加到收藏夹', {
          newCollection: theNewCollection,
        });
      } else {
        this.ctx.body = HTTPResponse(943, '收藏夹中已存在该单词！', null);
      }
    }
  }
  async getCollections() {
    const reqQuery = this.ctx.query;
    const page = reqQuery.page ? reqQuery.page : 0; // 取得当前分页，默认为 0

    const foundCollection = await this.ctx.model.Collection.findOne({
      userId: this.ctx.header.dp_uid,
    });
    if (foundCollection === null) {
      this.ctx.body = HTTPResponse(931, '还没有创建收藏夹', null);
      return;
    }
    // 记得按照 page 来对收藏夹的单词列表切片：
    const collections = [];
    for (const item of foundCollection.collections.slice(page * 10, (page + 1) * 10 + 1)) {
      const itemWord = await this.ctx.model[item.wordChapter].findOne({
        _id: item.wordId,
      });
      if (itemWord !== null) {
        const itemObj = itemWord.toObject();
        itemObj.definition = itemObj.definition.split('\n');
        itemObj.translation = itemObj.translation.split('\n');
        itemObj.tag = itemObj.tag !== '' ? itemObj.tag.split(' ').map(t => (wordTagMap[t] ? wordTagMap[t] : t)) : '';
        item.exchange = itemObj.exchange.split('/').map(e =>
          (wordExchangeMap[e[0]] ? (`${wordExchangeMap[e[0]]}: ` + e.slice(2)) : e)
        );
        collections.push({
          item: itemObj,
          createTime: item.createTime,
          lastHitTime: item.lastHitTime,
        });
      }
    }
    this.ctx.body = HTTPResponse(100, '获取收藏夹单词列表成功！', collections);
  }
  async hit() {
    const { wordId, hitTime } = this.ctx.request.body;
    if (!wordId || !hitTime) {
      this.ctx.body = HTTPResponse(937, '需要提供打卡的目标单词 ID 以及打卡时间', null);
      return;
    }
    const updateResult = await this.ctx.model.Collection.updateOne({
      userId: this.ctx.header.dp_uid,
      'collections.wordId': wordId,
    }, {
      $set: {
        'collections.$.lastHitTime': new Date(hitTime), // 2020-05-14T08:35:25.491+0000 式样的格式
      },
    });
    this.ctx.body = HTTPResponse(100, '单词打卡成功！', updateResult);
  }
}

module.exports = WordService;
