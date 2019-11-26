const apiRouter = require('express').Router();
const { ratings } = require('../database/controllers/rating');
const { reviews } = require('../database/controllers/review');

apiRouter.get('/rooms/:roomId/ratings', ratings.get);
apiRouter.post('/rooms/:roomId/ratings', ratings.post);
apiRouter.put('/rooms/:roomId/ratings', ratings.put);
apiRouter.patch('/rooms/:roomId/ratings', ratings.patch);
apiRouter.delete('/rooms/:roomId/ratings', ratings.delete);

apiRouter.get('/rooms/:roomId/reviews', reviews.get);
apiRouter.post('/rooms/:roomId/reviews', reviews.post);
apiRouter.put('/rooms/:roomId/reviews', reviews.put);
apiRouter.patch('/rooms/:roomId/reviews', reviews.patch);
apiRouter.delete('/rooms/:roomId/reviews', reviews.delete);

module.exports = apiRouter;
