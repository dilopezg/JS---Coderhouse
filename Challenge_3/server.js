const Contenedor = require('./Challenge_2.js');
const express = require('express');
 
const app = express()
 
const PORT = 8080

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))
 
const contenedor = new Contenedor('./productos.txt');

app.get('/productos', async (req, res) => {
  
  const productos = await contenedor.getAll();
  res.send(productos);
})

app.get('/productoRamdom', async (req, res) => {
  
  const productos = await contenedor.getAll()
  const indexRamdom = Math.floor(Math.random()*productos.length);
  const productoRamdom = productos[indexRamdom]
  res.send(productoRamdom)
})





  