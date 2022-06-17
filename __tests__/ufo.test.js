const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Ufo } = require('../lib/models/Ufo');

describe('ufo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/ufos should return a list of ufo sightings', async() => {
    const res = await request(app).get('/ufos');
    const ufos = await Ufo.getAll();
    const expected = ufos.map((ufo) => {
      return {
        it: ufo.id,
        ufo_name: ufo.ufo_name,
        ufo_location: ufo.ufo_location,
        ufo_year: ufo.ufo_year
      };
    });
    expect(res.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  });
});
