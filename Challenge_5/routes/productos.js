const express = require('express')
const { Router } = express
const router = Router(Router)

const Productos = require('./class_productos.js');
const productos = new Productos();





router.post('/productos', (req, res) => {
  let { body: data } = req
  productos.save(data) 
  console.log(productos.save(data) )

  res.render('index');
})


router.get('/productos', (_, res) => {
    
    res.render('index')
})

router.get('/', (_, res) => {
  const productos_list = productos.getAll()
  console.log(productos_list.length)
  res.render('productos',{productos_list})
})

module.exports = router;