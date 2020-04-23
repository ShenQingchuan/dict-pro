'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  async entry() {
    const { ctx } = this;
    ctx.body = '<h4><b>欢迎访问 专业英语翻译助手 公共 API 服务</b></h4>';
  }
}

module.exports = IndexController;
