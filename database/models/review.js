const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  roomId: Number,
  username: String,
  userAvatarURL: String,
  comment: String,
  createdAt: Date,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
