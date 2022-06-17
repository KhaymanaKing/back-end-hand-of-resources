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
  static async getById(id){
    const { rows } = await pool.query('SELECT * FROM comics WHERE comics.id=$1', [id]);
    if(!rows) return null;
    return(rows[0]);
  }
  static async insert({ comic_name, original_release, publisher }){
    const { rows } = await pool.query(
      'INSERT INTO comics (comic_name, original_release, publisher) VALUES ($1, $2, $3) RETURNING *',
      [comic_name, original_release, publisher]
    );
    return new Comic(rows[0]);
  }
  static async delete(id){
    const { rows } = await pool.query(
      'DELETE FROM comics WHERE id = $1 RETURNING *',
      [id]
    );
    return new Comic(rows[0]);
  }
  static async updateById(id, attrs){
    const comic = await Comic.getById(id);
    const { comic_name, original_release, publisher } = { ...comic, ...attrs };
    const { rows } = await pool.query(
      `UPDATE comics
        set comic_name=$2, original_release=$3, publisher=$4
        WHERE id=$1 RETURNING *`,
      [id, comic_name, original_release, publisher]
    );
    return new Comic(rows[0]);
  }
}

module.exports = { Comic };
