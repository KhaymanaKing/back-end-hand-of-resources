const { Router } = require('express');
const { Beer } = require('../models/Beer');

module.exports = Router()
  .get('/', async (req, res) => {
    const data = await Beer.getAll();
    res.json(data);
  })
  .get('/:id', async (req, res) => {
    const data = await Beer.getById(req.params.id);
    res.json(data);
  })
  .post('/', async (req, res, next) => {
    try{
      const data = await Beer.insert(req.body);
      res.json(data);
    } catch (e){
      next(e);
    }
  });
