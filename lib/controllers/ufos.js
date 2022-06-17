const { Router } = require('express');
const { Ufo } = require('../models/Ufo');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const data = await Ufo.getById(req.params.id);
    res.json(data);
  })
  .get('/', async (req, res) => {
    const data = await Ufo.getAll();
    res.json(data);
  });


