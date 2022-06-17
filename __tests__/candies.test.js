const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Candy } = require ('../lib/models/Candy');

describe('candy routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/candies should return a list of candies', async() => {
    const res = await request(app).get('/candies');
    const candies = await Candy.getAll();
    const expected = candies.map((candy) => {
      return{
        id: candy.id,
        candy_name: candy.candy_name,
        chocolate: candy.chocolate,
        taste_rating: candy.taste_rating
      };
    });
    expect(res.body).toEqual(expected);
  });
  afterAll(() => {
    pool.end();
  });
});
