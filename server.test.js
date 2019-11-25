const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
const path = require('path');
const fs = require('fs');

const Rating = require('./database/models/rating.js');

const seedDB = require('./database/seed.js');

describe('Express Server Endpoints', () => {
  const app = require('./server/index.js');
  let memMongo;
  let server;

  let agent;

  beforeEach(async (done) => {
    jest.setTimeout(120000);

    memMongo = await new MongoMemoryServer();
    process.env.MONGODB_URI = await memMongo.getConnectionString();

    await Rating.create({
      roomId: 1,
      ratingCheckIn: 1,
      ratingAccuracy: 1,
      ratingLocation: 1,
      ratingCommunication: 1,
      ratingCleanliness: 1,
      ratingValue: 1,
    });

    server = await app.listen(4000, (err) => {
      if (err) return done(err);

       agent = request.agent(server); // since the application is already listening, it should use the allocated port
       done();
    });
  });

  afterEach(async (done) => {
    await mongoose.disconnect();
    // console.log(server.close);
    return server && await server.close(done);
  });

  // afterAll(async () => {
  // 	await new Promise(resolve => setTimeout(() => resolve(), 1000)); // avoid jest open handle error
  // });

  test('It should respond to the root path', async () => {
    const res = await request(server).get('/api/rooms/1/ratings');
    expect(res.statusCode).toBe(200);
    expect(res.body[0].roomId).toBe(1);
  });

  // test('It should respond with an error to invalid paths', async () => {
  //   const res = await request(server).get('/invalid/path');
  //   expect(res.statusCode).toBe(404);
  // });
  //
  // test('It should respond to requests to /rooms/:id', async () => {
  //   const res = await request(server).get('/rooms/1');
  //   expect(res.statusCode).toBe(200);
  // });
  //
  // test('It should respond to requests to /rooms/:roomId/ratings', async () => {
  //   const res = await request(server).get('/rooms/1/ratings');
  //   expect(res.statusCode).toBe(200);
  // });
  //
  // test('It should respond to requests to /rooms/:roomId/reviews', async () => {
  //   const res = await request(server).get('/rooms/1/reviews');
  //   expect(res.statusCode).toBe(200);
  // });
  //
  // test('It should respond to static file requests from the dist directory', async () => {
  //
  //   const testFilePath = path.resolve(__dirname, '../client/dist/index.test.html');
  //   const testHTML =
  //     `<!DOCTYPE html>
  //       <html>
  //       <head>
  //         <title>TestFilr</title>
  //       </head>
  //       <body>
  //         This is a test
  //
  //       </body>
  //     </html>`;
  //
  //   await fs.writeFileSync(testFilePath, testHTML);
  //
  //   const staticResponse = await request(server).get('/index.test.html');
  //   expect(staticResponse.statusCode).toBe(200);
  //   expect(staticResponse.text).toEqual(testHTML);
  // });
});
