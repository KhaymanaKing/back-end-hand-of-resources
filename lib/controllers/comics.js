const { Router } = require('express');
const { Comic } = require('../models/Comic');

module.exports = Router ()
  .get('/:id', async (req, res) => {
    const data = await Comic.getById(req.params.id);
    res.json(data);
  }) 
  .post('/', async (req, res, next) => {
    try{
      const data = await Comic.insert(req.body);
      res.json(data);
    } catch (e){
      next (e);
    }
  }) 
  .get('/', async (req, res) => {
    const data = await Comic.getAll();
    res.json(data);
  });

