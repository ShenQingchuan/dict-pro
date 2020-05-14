'use strict';

const Controller = require('egg').Controller;

class WordController extends Controller {
  async queryWord() {
    await this.ctx.service.word.queryWordService();
  }

  async addToOwnCollection() {
    await this.ctx.service.word.addToOwnCollection();
  }

  async getCollections() {
    await this.ctx.service.word.getCollections();
  }
}

module.exports = WordController;
