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
  static async getById(id){
    const { rows } = await pool.query('SELECT * FROM ufos where ufos.id=$1', [id]);
    if(!rows) return null;
    return(rows[0]);
  }
  static async insert({ ufo_name, ufo_location, ufo_year }){
    const { rows } = await pool.query(
      'INSERT INTO ufos (ufo_name, ufo_location, ufo_year) VALUES ($1, $2, $3) RETURNING *',
      [ufo_name, ufo_location, ufo_year]
    );
    return new Ufo(rows[0]);
  }
  static async delete(id){
    const { rows } = await pool.query(
      'DELETE FROM ufos where id = $1 RETURNING *',
      [id]
    );
    return new Ufo(rows[0]);
  }
  static async updateById(id, attrs){
    const ufo = await Ufo.getById(id);
    if(!ufo) return null;
    const { ufo_name, ufo_location, ufo_year } = { ...ufo, ...attrs };
    const { rows } = await pool.query(
      `UPDATE ufos
        SET ufo_name=$2, ufo_location=$3, ufo_year=$4
        WHERE id=$1 RETURNING *`,
      [id, ufo_name, ufo_location, ufo_year]
    );
    return new Ufo(rows[0]);
  }
}

module.exports = { Ufo };

