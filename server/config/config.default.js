/* eslint valid-jsdoc: "off" */

'use strict';

const HTTPResponse = require('../app/utils/HTTPResponse');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    mongoose: {
      url: process.env.EGG_MONGODB_URL || 'mongodb://127.0.0.1:27017/dictpro',
      options: {
        server: {
          poolSize: 40,
        },
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
      },
    },
    onerror: {
      json(err, ctx) {
        ctx.status = 200; // everything is fine! I can handle it!

        if (/MongoError: E\d{5}/.test(String(err).slice(0, 18))) {
          const [ , errCode ] = String(err).slice(0, 18).split(': ')[1];
          const errMsg = String(err).slice(19);
          switch (errCode) {
            default:
              ctx.body = HTTPResponse(510, `MongoDB 错误代码: ${errCode}，错误提示信息：${errMsg}`);
              return;
          }
        }

        ctx.body = HTTPResponse(990, `${err}`);
      },
    },
    security: {
      csrf: {
        enable: false,
      },
      domainWhiteList: [ 'http://localhost:3000' ],
    },
    jwt: {
      secret: process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-dict-pro',
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + (process.env.EGG_COOKIE_KEY || '_1587625400546_5914');

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
