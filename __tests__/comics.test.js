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
  afterAll(() => {
    pool.end();
  });
});
