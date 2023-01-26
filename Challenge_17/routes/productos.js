import express from 'express';
const router = express.Router();
import  logger  from  "../logger/logger.js";
import ProductoService from '../services/productos.services.js';


router.get('/productos/listar', (req, res) => {
    try{
        logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
        res.json(ProductoService.listar());
    }catch(error) {
            logger.error(`${error.message}`)
            next(error);
    }
    
});

router.get('/productos/listar/:id', (req, res) => {
    try{
        logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
        let { id } = req.params;
        res.json(ProductoService.buscarPorId(id));
    }catch(error) {
        logger.error(`${error.message}`)
        next(error);
    }
});

router.post('/productos/guardar', (req, res) => {
    try{
        logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
        let producto = req.body;
        res.json(ProductoService.guardar(producto));
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
        res.json(ProductoService.actualizar(id, producto));
    }catch(error) {
        logger.error(`${error.message}`)
        next(error);
    }
    
});

router.delete('/productos/borrar/:id', (req, res) => {
    try{
        logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
        let { id } = req.params;
        res.json(ProductoService.borrar(id));
    }catch(error) {
        logger.error(`${error.message}`)
        next(error);
    }
});

router.get('/productos-test', (req, res) => { 
    try{
        logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)  
        let prods = ProductoService.generar();
        res.render('lista', { productos: prods, hayProductos: prods.length });
    }catch(error) {
        logger.error(`${error.message}`)
        next(error);
    } 
});

export default router;