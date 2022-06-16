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
  static async getById(id){
    const { rows } = await pool.query('SELECT * FROM beers WHERE beers.id=$1', [id]);
    if(!rows) return null;
    return(rows[0]);
  }
  static async insert({ beer_name, abv, region, ibu, pairing }){
    const { rows } = await pool.query(
      'INSERT INTO beers (beer_name, abv, region, ibu, pairing) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [beer_name, abv, region, ibu, pairing]
    );
    return new Beer(rows[0]);
  }
  static async delete(id){
    const { rows } = await pool.query(
      'DELETE FROM beers WHERE id = $1 RETURNING *',
      [id]
    );
    return new Beer(rows[0]);
  }
  static async updateById(id, attrs){
    const beer = await Beer.getById(id);
    if (!beer) return null;
    const { beer_name, abv, region, ibu, pairing } = { ...beer, ...attrs };
    const { rows } = await pool.query(
      `UPDATE beers
      SET beer_name=$2, abv=$3, region=$4, ibu=$5, pairing=$6
       WHERE id=$1 RETURNING *`,
      [id, beer_name, abv, region, ibu, pairing]
    );
    return new Beer(rows[0]);
  }
}

module.exports = { Beer };
