const express = require('express')
const { Router } = express
const router = Router(Router)

const Productos = require('./class_productos.js');
const productos = new Productos();


router.post('/productos', (req, res) => {
  let { body : data } = req
  res.status(200).json(productos.save(data))
})

router.get('/productos', (_, res) => {
    res.status(200).json(productos.getAll())
})

router.get('/productos/:id', (req, res) => {  
  const numberId = Number(req.params.id)
  res.status(200).json(productos.getById(numberId));
})

router.put('/productos/:id', (req, res) => {
  let { body : data } = req
  const numberId = Number(req.params.id)
  res.status(200).json(productos.updateById(data,numberId));
})

router.delete('/productos/:id', (req, res) => {
  const numberId = Number(req.params.id)
  res.status(200).json(productos.deleteById(numberId)); 
})

module.exports = router