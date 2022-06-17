const { Router } = require('express');
const { Candy } = require('../models/Candy');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const data = await Candy.getById(req.params.id);
    res.json(data);
  })
  .delete('/:id', async (req, res, next) => {
    try{
      const data = await Candy.delete(req.params.id);
      res.json(data);
    } catch (e){
      next(e);
    }
  })
  .put('/:id', async(req, res, next) => {
    try {
      const data = await Candy.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e){
      next (e);
    }
  })
  .post('/', async(req, res, next) => {
    try {
      const data = await Candy.insert(req.body);
      res.json(data);
    } catch (e){
      next (e);
    }
  })
  .get('/', async (req, res) => {
    const data = await Candy.getAll();
    res.json(data);
  });
