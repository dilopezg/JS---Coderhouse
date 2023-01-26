import express from 'express';
const router = express.Router();
import  logger  from "../logger/logger.js";

import login from './login.js'
import registro from './registro.js'
import productosRouter from './productos.js';
import indexRouter from './chat.js';
import info from './info.js';


router.use('/', productosRouter, indexRouter, login, registro, info);

router.use('*', (req, res) => {
	const path = req.params;
	const method = req.method;
	logger.warn(`ruta '${path[0]}' método '${method}' no implementada`);
});

export default router;