const Review = require('../models/review.js');

module.exports = {
  reviews: {
    get: (req, res) => {
      const roomId = Number(req.params.roomId);
      Review.find({ roomId })
        .then(reviews => {
          res.json(reviews);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    },
    post: (req, res) => {
      res.status(405).send('Method not allowed.');
    },
    put: (req, res) => {
      res.status(405).send('Method not allowed.');
    },
    patch: (req, res) => {
      res.status(405).send('Method not allowed.');
    },
    delete: (req, res) => {
      res.status(405).send('Method not allowed.');
    }
  },
};
