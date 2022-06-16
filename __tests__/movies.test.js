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
    expect(res.body).toEqual(expected);
  });
  afterAll(() => {
    pool.end();
  });
});
