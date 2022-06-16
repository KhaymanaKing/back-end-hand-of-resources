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
  static async getById(id){
    const { rows } = await pool.query('SELECT * FROM movies WHERE movies.id=$1', [id]);
    if(!rows) return null;
    return(rows[0]);
  }
}

module.exports = { Movie };
