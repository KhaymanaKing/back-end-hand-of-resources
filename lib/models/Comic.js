const pool = require('../utils/pool');

class Comic {
  id;
  comic_name;
  original_release;
  publisher;

  constructor(row) {
    this.id = row.id;
    this.comic_name = row.comic_name;
    this.original_release = row.original_release;
    this.publisher = row.publisher;
  }
  static async getAll(){
    const { rows } = await pool.query('SELECT * FROM comics');
    return rows.map((row) => new Comic(row));
  }
}

module.exports = { Comic };
