const express = require('express')
const { Router } = express
const router = Router(Router)

const Productos = require('./class_productos.js');
const productos = new Productos();





router.post('/productos', (req, res) => {
  let { body: data } = req
  productos.save(data) 

  res.redirect('/api/productos');
})

router.get('/productos', (_, res) => {
    const producto_getall = productos.getAll()
    console.log(producto_getall)
    res.render('index',producto_getall)
})

router.get('/', (_, res) => {
  const producto_getall = productos.getAll()
  console.log(producto_getall)
  res.render('layout',producto_getall)
})

module.exports = router;