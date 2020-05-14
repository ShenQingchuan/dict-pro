'use strict';

const jsonwebtoken = require('jsonwebtoken');

// eslint-disable-next-line no-unused-vars
module.exports = options => {
  return async (ctx, next) => {
    const { dp_utoken = '' } = ctx.request.header;
    try {
      const user = jsonwebtoken.verify(dp_utoken,
        process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-dict-pro');
      ctx.state.user = user;
    } catch (err) {
      ctx.throw(401, err.message);
    }
    await next();
  };
};
