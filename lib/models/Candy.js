const pool = require('../utils/pool');

class Candy { 
  id;
  candy_name;
  chocolate; 
  taste_rating;

  constructor(row) {
    this.id = row.id;
    this.candy_name = row.candy_name;
    this.chocolate = row.chocolate;
    this.taste_rating = row.taste_rating;
  }
  static async getAll(){
    const { rows } = await pool.query('SELECT * FROM candies');
    return rows.map((row) => new Candy(row));
  }
  static async getById(id){
    const { rows } = await pool.query('SELECT * FROM candies WHERE candies.id=$1', [id]);
    if(!rows) return null;
    return(rows[0]);
  }
}

module.exports = { Candy };

