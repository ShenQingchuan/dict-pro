'use strict';

const Service = require('egg').Service;
const HTTPResponse = require('../utils/HTTPResponse');
const wordTagMap = require('../utils/WordTagMap');
const wordExchangeMap = require('../utils/WordExchangeMap');

class WordService extends Service {
  async queryWordService() {
    const word = this.ctx.query && this.ctx.query.word;
    const chapter = `Dictionary${word[0].toUpperCase()}`;
    const found = await this.ctx.model[chapter].findOne({
      word,
    });

    // 对返回结果做处理
    const result = Object.assign({}, found._doc, {
      definition: found.definition.split('\n'),
      translation: found.translation.split('\n'),
      tag: found.tag.split(' ').map(t => (wordTagMap[t] ? wordTagMap[t] : t)),
      exchange: found.exchange.split('/').map(e =>
        (wordExchangeMap[e[0]] ? (`${wordExchangeMap[e[0]]}: ` + e.slice(2)) : e)
      ),
    });

    this.ctx.body = HTTPResponse(100, '已查询到单词。', {
      result,
    });
  }
}

module.exports = WordService;
