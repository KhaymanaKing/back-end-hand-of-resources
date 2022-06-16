const { Router } = require('express');
const { Movie } = require('../models/Movie');

module.exports = Router()
  .get('/', async (req, res) => {
    const data = await Movie.getAll();
    res.json(data);
  });
