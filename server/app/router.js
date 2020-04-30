'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.index.entry);
  router.get('/query', controller.word.queryWord);
  router.post('/user', controller.user.register);
  router.post('/login', controller.user.login);
};
