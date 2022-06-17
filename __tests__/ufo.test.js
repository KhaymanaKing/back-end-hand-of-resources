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
  it('should add a new ufo sighting', async() => {
    const res = await request(app)
      .post('/ufos')
      .send({
        ufo_name: 'test ufo',
        ufo_location: 'test location',
        ufo_year: 5
      });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      'id': expect.anything(),
      'ufo_name': 'test ufo',
      'ufo_location': 'test location',
      'ufo_year': 5
    });
  });
  it('should add a new ufo sighting and then delete it', async() => {
    const createRes = await request(app)
      .post('/ufos')
      .send({
        ufo_name: 'test ufo',
        ufo_location: 'test location',
        ufo_year: 5
      });
    expect(createRes.status).toBe(200);
    expect(createRes.body).toEqual({
      'id': expect.anything(),
      'ufo_name': 'test ufo',
      'ufo_location': 'test location',
      'ufo_year': 5
    });
    const delRes = await request(app).delete('/ufos/6');
    expect(delRes.status).toEqual(200);
    const { body } = await request(app).get('/ufos/6');
    expect(body).toEqual('');
  });
  afterAll(() => {
    pool.end();
  });
});
