const { Router } = require('express');
const { Movie } = require('../models/Movie');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const data = await Movie.getById(req.params.id);
    res.json(data);
  })
  
  .get('/', async (req, res) => {
    const data = await Movie.getAll();
    res.json(data);
  });
