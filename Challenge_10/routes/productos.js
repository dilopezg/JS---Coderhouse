const express = require('express');
const router = express.Router();
const Productos = require('../api/index_productos');
const productos = new Productos("./db/productos.txt");

router.get('/productos/listar', (req, res) => {
    res.json(productos.listar());
});

router.get('/productos/listar/:id', (req, res) => {
    let { id } = req.params;
    res.json(productos.buscarPorId(id));
});

router.post('/productos/guardar', (req, res) => {
    let producto = req.body;
    res.json(productos.guardar(producto));
});

router.put('/productos/actualizar/:id', (req, res) => {
    let { id } = req.params
    let producto = req.body
    res.json(productos.actualizar(id, producto));
});

router.delete('/productos/borrar/:id', (req, res) => {
    let { id } = req.params;
    res.json(productos.borrar(id));
});

router.get('/productos-test', (req, res) => {    
    let prods = productos.generar();
    res.render('lista', { productos: prods, hayProductos: prods.length });
});

module.exports = router;