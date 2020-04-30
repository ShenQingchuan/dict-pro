'use strict';

const Controller = require('egg').Controller;

class WordController extends Controller {
  async queryWord() {
    await this.ctx.service.word.queryWordService();
  }
}

module.exports = WordController;
