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
        id: ufo.id,
        ufo_name: ufo.ufo_name,
        ufo_location: ufo.ufo_location,
        ufo_year: ufo.ufo_year
      };
    });
    expect(res.body).toEqual(expected);
  });
  it('/ufos/:id should return ufo sighting by id', async() => {
    const res = await request(app).get('/ufos/1');
    expect(res.body).toEqual({
      'id': '1',
      'ufo_name': expect.any(String),
      'ufo_location': expect.any(String),
      'ufo_year': expect.any(Number)
    });
  });

  afterAll(() => {
    pool.end();
  });
});
