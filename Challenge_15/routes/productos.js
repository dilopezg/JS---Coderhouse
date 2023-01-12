const express = require('express');
const router = express.Router();
const {productosDao} = require('../daos/index.js');
const { logger } = require( "../logger/logger.js");

router.get('/productos/listar', (req, res) => {
    try{
        logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
        res.json(productosDao.listar());
    }catch(error) {
            logger.error(`${error.message}`)
            next(error);
    }
    
});

router.get('/productos/listar/:id', (req, res) => {
    try{
        logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
        let { id } = req.params;
        res.json(productosDao.buscarPorId(id));
    }catch(error) {
        logger.error(`${error.message}`)
        next(error);
    }
});

router.post('/productos/guardar', (req, res) => {
    try{
        logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
        let producto = req.body;
        res.json(productosDao.guardar(producto));
    }catch(error) {
        logger.error(`${error.message}`)
        next(error);
    }
    
});

router.put('/productos/actualizar/:id', (req, res) => {
    try{
        logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
        let { id } = req.params
        let producto = req.body
        res.json(productosDao.actualizar(id, producto));
    }catch(error) {
        logger.error(`${error.message}`)
        next(error);
    }
    
});

router.delete('/productos/borrar/:id', (req, res) => {
    try{
        logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
        let { id } = req.params;
        res.json(productosDao.borrar(id));
    }catch(error) {
        logger.error(`${error.message}`)
        next(error);
    }
});

router.get('/productos-test', (req, res) => { 
    try{
        logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)  
        let prods = productosDao.generar();
        res.render('lista', { productos: prods, hayProductos: prods.length });
    }catch(error) {
        logger.error(`${error.message}`)
        next(error);
    } 
});

module.exports = router;