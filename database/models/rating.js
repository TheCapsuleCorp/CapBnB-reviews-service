const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
  roomId: Number,
  ratingCheckIn: Number,
  ratingAccuracy: Number,
  ratingLocation: Number,
  ratingCommunication: Number,
  ratingCleanliness: Number,
  ratingValue: Number,
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
