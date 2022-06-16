const pool = require('../utils/pool');

class Beer {
  id;
  beer_name;
  abv;
  region;
  ibu;
  pairing;
  
  constructor(row) {
    this.id = row.id;
    this.beer_name = row.beer_name;
    this.abv = row.abv;
    this.region = row.region;
    this.ibu = row.ibu;
    this.pairing = row.pairing;
  }
  static async getAll(){
    const { rows } = await pool.query('SELECT * FROM beers');
    return rows.map((row) => new Beer(row));
  }
  static async getById(){
    const { rows } = await pool.query('SELECT * beers WHERE beers.id = $1');
  }
}

module.exports = { Beer };
