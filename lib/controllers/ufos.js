const { Router } = require('express');
const { Ufo } = require('../models/Ufo');

module.exports = Router()
  .get('/', async (req, res) => {
    const data = await Ufo.getAll();
    res.json(data);
  });

  
