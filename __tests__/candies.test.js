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
  it('/candies/:id should return one candy', async() => {
    const res = await request(app).get('/candies/1');
    expect(res.body).toEqual({
      'id': '1',
      'candy_name': expect.any(String),
      'chocolate': expect.any(Boolean),
      'taste_rating': expect.any(Number)
    });
  });
  it('should add a new candy', async () => {
    const res = await request(app)
      .post('/candies')
      .send({
        candy_name: 'test',
        chocolate: false,
        taste_rating: 3
      });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      'id':expect.anything(),
      'candy_name': 'test',
      chocolate: false,
      taste_rating: 3
    }); 
  });
  afterAll(() => {
    pool.end();
  });
});
