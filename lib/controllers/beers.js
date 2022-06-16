const { Router } = require('express');
const { Beer } = require('../models/Beer');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const data = await Beer.getById(req.params.id);
    res.json(data);
  })
  
  .delete('/:id', async(req, res, next) => {
    try {
      const data = await Beer.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next (e);
    }
  })
  .put('/:id', async(req, res, next) => {
    try {
      const data = await Beer.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e){
      next (e);
    }
  })
  .post('/', async (req, res, next) => {
    try{
      const data = await Beer.insert(req.body);
      res.json(data);
    } catch (e){
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const data = await Beer.getAll();
    res.json(data);
  });

