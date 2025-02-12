const express = require('express');
const ProductsService = require('../services/products.service')
const validatorHandler = require('../middleware/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schemas')

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.status(200).json(products)
})
router.get('/filter', async (req, res) => {
  res.send("soy un filter")
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    // destructuracion
    const { id } = req.params;
    const products = await service.findOne(id)
    res.json({
      id,
      products
    })
  } catch (error) {
    next(error)
  }

})

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const body = req.body
  const products = service.create(body)
  res.status(201).json({
    message: 'created',
    data: products
  })
})

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const products = await service.update(body, id)
    res.json({
      message: 'Update',
      data: products,
      id,
    })
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }

})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = service.delete(id)
  res.json({
    message: 'delete',
    data: product
  })
})
module.exports = router;
