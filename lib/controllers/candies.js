const { Router } = require('express');
const { Candy } = require('../models/Candy');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const data = await Candy.getById(req.params.id);
    res.json(data);
  })
  .get('/', async (req, res) => {
    const data = await Candy.getAll();
    res.json(data);
  });
