const pool = require('../utils/pool');

class Ufo { 
  id;
  ufo_name;
  ufo_location;
  ufo_year;

  constructor(row) {
    this.id = row.id;
    this.ufo_name = row.ufo_name; 
    this.ufo_location = row.ufo_location;
    this.ufo_year = row.ufo_year;
  }
  static async getAll(){
    const { rows } = await pool.query('SELECT * from ufos');
    return rows.map((row) => new Ufo(row));
  }
}

module.exports = { Ufo };

