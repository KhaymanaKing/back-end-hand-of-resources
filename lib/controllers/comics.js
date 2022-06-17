const { Router } = require('express');
const { Comic } = require('../models/Comic');

module.exports = Router ()
  .get('/:id', async (req, res) => {
    const data = await Comic.getById(req.params.id);
    res.json(data);
  }) 
  .delete('/:id', async(req, res, next) => {
    try {
      const data = await Comic.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next (e);
    }
  })
  .put('/:id', async(req, res, next) => {
    try{
      const data = await Comic.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e){
      next (e);
    }
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

