const express = require('express');
const router = express.Router();

const login = require('./login.js')
const registro = require('./registro.js')
const productosRouter = require('./productos');
const indexRouter = require('./chat');
const info = require('./info');

router.use('/', productosRouter, indexRouter, login, registro,info);

module.exports = router;