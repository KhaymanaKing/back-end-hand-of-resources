const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Movie } = require('../lib/models/Movie');

describe('movie routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/movies should return a list of movies', async() => {
    const res = await request(app).get('/movies');
    const movies = await Movie.getAll();
    const expected = movies.map((movie) => {
      return{
        id: movie.id,
        title: movie.title,
        release: movie.release,
        director: movie.director
      };
    });
    it('/movies/:id should return a movie by id', async () => {
      const res = await request(app).get('/movies/1');
      expect(res.body).toEqual({
        'id': '1',
        'title': expect.any(String),
        release: expect.any(Number),
        director: expect.any(String)
      });
    });
    expect(res.body).toEqual(expected);
  });
  afterAll(() => {
    pool.end();
  });
});
