const express = require('express')
const { Router } = express
const router = Router(Router)

const Productos = require('./class_productos.js');
const productos = new Productos();

router.post('/productos', (req, res) => {
  let { body: data } = req
  productos.save(data)   
  res.render('index');
})

router.get('/productos', (_, res) => {    
    res.render('index')
})

router.get('/productos_list', (_, res) => {
  const productos_list = productos.getAll()  
  res.render('productos',{productos_list})
})

module.exports = router;
