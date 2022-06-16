const pool = require('../utils/pool');

class Movie {
  id;
  title;
  release;
  director;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.release = row.release;
    this.director = row.director;
  }
  static async getAll(){
    const { rows } = await pool.query('SELECT * FROM movies ');
    return rows.map((row) => new Movie(row));
  }
}

module.exports = { Movie };
