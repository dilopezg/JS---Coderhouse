const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const http = require('http').Server(app);
const productos = require('./api/producto');
const MessageController = require("./api/MessageController");
const handlerMessage = new MessageController("./mensajes.txt");

const io = require('socket.io')(http);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);

app.set("view engine", "hbs");
app.set("views", __dirname + '/views');

io.on('connection', async socket => {

        console.log('Nuevo cliente conectado!');    
    socket.emit('productos', productos.listar());
    
    socket.on('update', data => {
        io.sockets.emit('productos', productos.listar());
    });

    socket.emit("history-messages", await handlerMessage.getAll());
  
    socket.on("new-message", (data) => {
      data.time = new Date().toLocaleString();
      handlerMessage.save(data);
      io.sockets.emit('notification', data);
    });

    socket.on('disconection', () => {
      console.log('Se desconecto el cliente con el id', socket.id)
    })
});

app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
});

const productosRouter = require('./routes/productos');
const indexRouter = require('./routes/chat')
app.use('/api', productosRouter);
app.use('/api', indexRouter)

const PORT = process.env.PORT || 3000;

const server = http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

server.on('error', error => {
    console.log('error en el servidor:', error);
});
