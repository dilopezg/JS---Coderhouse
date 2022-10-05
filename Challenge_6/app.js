const handlebars = require("express-handlebars");
const express = require('express')
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const Productos = require('./routes/class_productos');

const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./views/layouts"));

const productos = new Productos();
const messages = []

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    partialsDir: __dirname + "/views/partials",
  })
);
app.set("views", "./views");
app.set("views engine", "hbs");

app.get("/", (req, res) => {
  let content = productos.productos;
  let boolean = content.length !== 0;
  return res.render("layouts/main.hbs", {
    list: content,
    showList: boolean,
  });
});

app.post("/", (req, res) => {
  productos.save(req.body);
  let content = productos.productos;
  let boolean = content.length !== 0;
  return res.render("layouts/main.hbs", { list: content, showList: boolean });
});

httpServer.listen(PORT, () => {
    console.log(`Servidor http esta escuchando en el puerto ${httpServer.address().port}`)
    console.log(`http://localhost:${httpServer.address().port}`)
    console.log(`Environment:${ENV}`)
});

/* CHAT */
io.on("connection", (socket) => {
    socket.emit("messages", messages);
  
    socket.on("new-message", (data) => {
      data.time = new Date().toLocaleString();
      messages.push(data);
      io.sockets.emit("messages", [data]);
    });
  });