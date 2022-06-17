const { Router } = require('express');
const { Ufo } = require('../models/Ufo');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const data = await Ufo.getById(req.params.id);
    res.json(data);
  })
  .post('/', async (req, res, next) => {
    try{
      const data = await Ufo.insert(req.body);
      res.json(data);
    } catch (e){
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const data = await Ufo.getAll();
    res.json(data);
  });


