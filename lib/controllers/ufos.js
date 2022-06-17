const { Router } = require('express');
const { Ufo } = require('../models/Ufo');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const data = await Ufo.getById(req.params.id);
    res.json(data);
  })
  .put('/:id', async(req, res, next) => {
    try{
      const data = await Ufo.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e){
      next (e);
    }
  })
  .delete('/:id', async(req, res, next) => {
    try {
      const data = await Ufo.delete(req.params.id);
      res.json(data);
    } catch (e){
      next (e);  
    }
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


