const { Router } = require('express');
const { Candy } = require('../models/Candy');

module.exports = Router()
  .get('/', async (req, res) => {
    const data = await Candy.getAll();
    res.json(data);
  });
