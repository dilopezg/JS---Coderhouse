const express = require('express');
const router = express.Router();

const login = require('./login.js')
const registro = require('./registro.js')
const productosRouter = require('./productos');
const indexRouter = require('./chat');

router.use('/', productosRouter, indexRouter, login, registro);

module.exports = router;