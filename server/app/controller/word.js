'use strict';

const Controller = require('egg').Controller;

class WordController extends Controller {
  async queryWord() {
    await this.ctx.service.word.queryWordService();
  }

  async addToOwnCollection() {
    await this.ctx.service.word.addToOwnCollection();
  }

  async removeFromCollection() {
    await this.ctx.service.word.removeFromCollection();
  }

  async getCollections() {
    await this.ctx.service.word.getCollections();
  }

  async hitCollectedWord() {
    await this.ctx.service.word.hit();
  }

  async getNeedHitCount() {
    await this.ctx.service.word.needHitCount();
  }
}

module.exports = WordController;
