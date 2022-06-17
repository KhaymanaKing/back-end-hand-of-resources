const { Router } = require('express');
const { Comic } = require('../models/Comic');

module.exports = Router ()
  .get('/', async (req, res) => {
    const data = await Comic.getAll();
    res.json(data);
  });

