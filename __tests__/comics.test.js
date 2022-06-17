const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Comic } = require('../lib/models/Comic');

describe('comic routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/comics should return a list of comics', async() => {
    const res = await request(app).get('/comics');
    const comics = await Comic.getAll();
    const expected = comics.map((comic) => {
      return{
        id: comic.id,
        comic_name: comic.comic_name,
        original_release: comic.original_release,
        publisher: comic.publisher
      };
    });
    expect(res.body).toEqual(expected);
  });
  it('/comics/:id should return a single comic', async () => {
    const res = await request(app).get('/comics/1');
    expect(res.body).toEqual({
      'id': '1',
      'comic_name': expect.any(String),
      'original_release': expect.any(Number),
      'publisher': expect.any(String)
    });
  });
  it('should add a new comic', async() => {
    const res = await request(app)
      .post('/comics')
      .send({
        comic_name: 'test',
        original_release: 2020,
        publisher: 'Test'
      });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      'id': expect.anything(),
      'comic_name': 'test',
      'original_release': 2020,
      'publisher': 'Test'
    });
  });
  afterAll(() => {
    pool.end();
  });
});
