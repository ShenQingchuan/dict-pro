'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    await this.ctx.service.user.addUser();
  }

  async login() {
    await this.ctx.service.user.login();
  }
}

module.exports = UserController;
