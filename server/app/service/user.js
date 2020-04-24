'use strict';

const Service = require('egg').Service;
const { genSalt, hash } = require('bcryptjs');
const HTTPResponse = require('../utils/HTTPResponse');

class UserService extends Service {
  async addUser() {
    const salt = await genSalt(10);
    const reqBody = this.ctx.request.body;
    const passwordHash = await hash(reqBody.password, salt);
    const createTime = new Date();

    const newUser = new this.ctx.model.User({
      userName: reqBody.userName,
      password: passwordHash,
      createTime,
      updateTime: createTime,
    });
    const newRecord = await newUser.save();
    newRecord.password = undefined; // 保护密码字段

    this.ctx.body = HTTPResponse(100, '注册成功！', {
      newUser: newRecord,
    });
  }
}

module.exports = UserService;
