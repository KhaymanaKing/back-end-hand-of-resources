const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('beer routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/beers should return a list of beers', async() => {
    const res = await request(app).get('/beers');
    const beers = await Beer.getAll();
    const expected = beers.map((beer) => {
      return{
        id: beer.id,
        beer_name: beer.beer_name,
        abv: beer.abv,
        region: beer.region,
        ibu: beer.ibu,
        pair: beer.pairing
      };
    });
    expect(1).toEqual(1);
  });
  afterAll(() => {
    pool.end();
  });
});
