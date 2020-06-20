'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const needAuth = app.middleware.authorize();
  const { router, controller } = app;

  router.get('/', controller.index.entry);
  router.get('/query', controller.word.queryWord);
  router.get('/collections', needAuth, controller.word.getCollections);
  router.post('/collect', needAuth, controller.word.addToOwnCollection);
  router.delete('/collect', needAuth, controller.word.removeFromCollection);
  router.put('/hit', needAuth, controller.word.hitCollectedWord);
  router.get('/hitCount', needAuth, controller.word.getNeedHitCount);
  router.post('/user', controller.user.register);
  router.post('/login', controller.user.login);
};
