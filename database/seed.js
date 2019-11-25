const faker = require('faker');
const mongoose = require('mongoose');

const db = require('./index.js');
const Rating = require('./models/rating.js');
const Review = require('./models/review.js');

const seedDB = function() {
  const ratings = [];
  const reviews = [];
  const roomIds = [];
  let rating, review;

  for (let i = 0; i < 100; i++) {
    roomIds.push(faker.random.number({min: 11111111, max: 99999999}));
  }

  for (let i = 0; i < 5000; i++) {
    rating = {
      roomId: faker.random.arrayElement(roomIds),
      ratingCheckIn: faker.finance.amount(1, 5, 1),
      ratingAccuracy: faker.finance.amount(1, 5, 1),
      ratingLocation: faker.finance.amount(1, 5, 1),
      ratingCommunication: faker.finance.amount(1, 5, 1),
      ratingCleanliness: faker.finance.amount(1, 5, 1),
      ratingValue: faker.finance.amount(1, 5, 1),
    };

    review = {
      roomId: faker.random.arrayElement(roomIds),
      username: faker.name.firstName(),
      userAvatarURL: faker.image.avatar(),
      comment: faker.lorem.paragraphs(faker.random.number({min: 1, max: 3})),
      createdAt: faker.date.past(5, '2019-11-23'),
    };

    ratings.push(rating);
    reviews.push(review);
  }

  db.connect().then(() => {
    return Rating.deleteMany({});
  }).then(() => {
    // console.log('Ratings collection cleared.');
    return Review.deleteMany({});
  }).then(() => {
    // console.log('Reviews collection cleared.');
    return Rating.insertMany(ratings);
  }).then(() => {
    // console.log('Ratings collection seeded successfully.');
    return Review.insertMany(reviews);
  }).then(() => {
    // console.log('Reviews collection seeded successfully.');
    const connection = mongoose.connection;
    return connection.close();
  }).then(() => {
    // console.log('Database connection closed.');
    return;
  }).catch(err => {
    console.log(`Error while seeding database: ${err}`);
  });
  return;
};

module.exports = seedDB;
