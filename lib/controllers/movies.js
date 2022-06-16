const { Router } = require('express');
const { Movie } = require('../models/Movie');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const data = await Movie.getById(req.params.id);
    res.json(data);
  })
  .delete('/:id', async(req, res, next) => {
    try {
      const data = await Movie.delete(req.params.id);
      res.json(data);
    } catch (e){
      next(e);
    }
  })
  .post('/', async(req, res, next) => {
    try{
      const data = await Movie.insert(req.body);
      res.json(data);
    } catch (e){
      next(e);
    }
  })
  
  .get('/', async (req, res) => {
    const data = await Movie.getAll();
    res.json(data);
  });
