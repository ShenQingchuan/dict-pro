'use strict';

const Service = require('egg').Service;
const { genSalt, hash, compare } = require('bcryptjs');
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

  async login() {
    const reqBody = this.ctx.request.body;
    const foundUser = await this.ctx.model.User.findOne({
      userName: reqBody.userName,
    }).select('+password');

    // 校验密码
    const passwordValidate = await compare(reqBody.password, foundUser.password);
    if (passwordValidate) {
      // 登录成功生成 Token
      const token = this.app.jwt.sign({
        uid: foundUser.id,
      }, this.config.jwt.secret, {
        expiresIn: '2h',
      });

      const { userName, email, createTime, avatarUrl } = foundUser;
      this.ctx.body = HTTPResponse(100, '登录成功！', {
        token,
        publicInfo: {
          userName,
          email,
          createTime,
          avatarUrl,
        },
      });
    } else {
      this.ctx.body = HTTPResponse(440, '密码不正确！');
    }
  }
}

module.exports = UserService;
