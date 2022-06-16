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
        release_year: movie.release_year,
        director: movie.director
      };
    });
    expect(res.body).toEqual(expected);
  });
  it('/movies/:id should return a movie by id', async () => {
    const res = await request(app).get('/movies/1');
    expect(res.body).toEqual({
      'id': '1',
      'title': expect.any(String),
      'release_year': expect.any(String),
      'director': expect.any(String)
    });
  });
  it('should add a new movie', async() => {
    const res = await request(app)
      .post('/movies')
      .send({
        title: 'test',
        release_year: 2020,
        director: 'test director'
      });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      'id': expect.anything(),
      'title': 'test',
      'release_year': '2020',
      'director': 'test director'
    }); 
  });
  it('should create and then delete a movie', async() => {
    const createRes = await request(app)
      .post('/movies')
      .send({
        title: 'test',
        release_year: 2020,
        director:'test director'
      });
    expect(createRes.status).toBe(200);
    expect(createRes.body).toEqual({
      'id': expect.anything(),
      'title': 'test',
      'release_year': '2020',
      'director': 'test director'
    });
    const delRes = await request(app).delete('/movies/6');
    expect(delRes.status).toEqual(200);
    const { body } = await request(app).get('/movies/6');
    expect(body).toEqual('');
  });
  afterAll(() => {
    pool.end();
  });
});
