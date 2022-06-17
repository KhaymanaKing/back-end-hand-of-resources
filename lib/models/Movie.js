const pool = require('../utils/pool');

class Movie {
  id;
  title;
  release_year;
  director;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.release_year = row.release_year;
    this.director = row.director;
  }
  static async getAll(){
    const { rows } = await pool.query('SELECT * FROM movies ');
    return rows.map((row) => new Movie(row));
  }
  static async getById(id){
    const { rows } = await pool.query('SELECT * FROM movies WHERE movies.id=$1', [id]);
    if(!rows) return null;
    return(rows[0]);
  }
  static async insert({ title, release_year, director }){
    const { rows } = await pool.query(
      'INSERT INTO movies (title, release_year, director) VALUES($1, $2, $3) RETURNING *',
      [title, release_year, director]
    );
    return new Movie(rows[0]);
  }
  static async delete(id){
    const { rows } = await pool.query(
      'DELETE FROM movies WHERE id = $1 RETURNING *',
      [id]
    );
    return new Movie(rows[0]);
  }
  static async updateById(id, attrs){
    const movie = await Movie.getById(id);
    if(!movie) return null;
    const { title, release_year, director } = { ...movie, ...attrs };
    const { rows } = await pool.query(
      `UPDATE movies
    SET title=$2, release_year=$3, director=$4
    WHERE id=$1 RETURNING *`,
      [id, title, release_year, director]
    );
    return new Movie(rows[0]);
  }
}
module.exports = { Movie };
