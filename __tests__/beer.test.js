const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Beer } = require('../lib/models/Beer');


describe('beer routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/beers should return a list of beers', async() => {
    const res = await request(app).get('/beers');
    const beers = await Beer.getAll();
    console.log('beers', beers);
    const expected = beers.map((beer) => {
      return{
        id: beer.id,
        beer_name: beer.beer_name,
        abv: beer.abv,
        region: beer.region,
        ibu: beer.ibu,
        pairing: beer.pairing
      };
    });
    expect(res.body).toEqual(expected);
  });
  afterAll(() => {
    pool.end();
  });
});
