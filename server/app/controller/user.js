'use strict';

const Controller = require('egg').Controller;


class UserController extends Controller {
  async register() {
    await this.ctx.service.user.addUser();
  }
}

module.exports = UserController;
