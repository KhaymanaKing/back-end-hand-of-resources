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
  it('/beers:id should return beer by id', async () => {
    const res = await request.agent(app).get('/beers/1');
    expect(res.body).toEqual({
      'id': expect.any(String),
      'beer_name': expect.any(String),
      'abv': expect.any(Number),
      'region': expect.any(String),
      'ibu': expect.any(Number),
      'pairing': expect.any(String)
    });
  });
  it('should add a new beer', async() => {
    const res = await request(app)
      .post('/beers')
      .send({
        beer_name: 'Test Beer',
        abv: 5,
        region: 'Washington',
        ibu: 28,
        pairing: 'Ketchup'
      });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      'id': '6',
      'beer_name': 'Test Beer',
      'abv': 5,
      'region': 'Washington',
      'ibu': 28,
      'pairing': 'Ketchup'
    });
  });
  afterAll(() => {
    pool.end();
  });
});
