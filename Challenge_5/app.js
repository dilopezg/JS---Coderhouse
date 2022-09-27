const handlebars = require('express-handlebars')
const express = require('express')
const path = require('path')


const productos = require('./routes/productos')

const app = express()

const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use('/static', express.static(path.join(__dirname, 'public')))


app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
//app.set('view engine', 'ejs');

app.use('/api', productos)

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const server = app.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
  console.log(`http://localhost:${server.address().port}`)
  console.log(`Environment:${ENV}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))