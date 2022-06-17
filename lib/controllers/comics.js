const { Router } = require('express');
const { Comic } = require('../models/Comic');

module.exports = Router ()
  .get('/:id', async (req, res) => {
    const data = await Comic.getById(req.params.id);
    res.json(data);
  })  
  .get('/', async (req, res) => {
    const data = await Comic.getAll();
    res.json(data);
  });

