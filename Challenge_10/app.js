const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const http = require('http').Server(app);
const Producto = require('./api/index_productos');
const productos = new Producto("./db/productos.txt");
const chats = require('./api/index_chat');
const handlerMessage = new chats("./db/mensajes.txt");
const normalizar = require('./controller/normalizador')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const io = require('socket.io')(http);

app.use(express.json());
const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://backend:Colombia1234*@cluster0.qlwrfxp.mongodb.net/session?retryWrites=true&w=majority',
        mongoOptions: advancedOptions,
        ttl: 60,
    }),
    secret: 'dilg1911',
    resave: true,
    saveUninitialized: true,
}));
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

    socket.emit('productos', await productos.listar());

    socket.on("new-producto", async (data) => {
        productos.guardar(data);
        io.sockets.emit('productos', await productos.listar());
    });

    const dataMensajes = await handlerMessage.getAll();
    const data = await normalizar(dataMensajes);
    socket.emit("history-messages", data);

    socket.on("new-message", async (data) => {
        data.time = new Date().toLocaleString();
        await handlerMessage.save(data);
        const dataMensajes = await handlerMessage.getAll();
        const data_toshow = await normalizar(dataMensajes);
        io.sockets.emit('history-messages', data_toshow);
    });

    socket.on('disconection', () => {
        console.log('Se desconecto el cliente con el id', socket.id)
    })
});

app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
});

const sessionRouter = require('./routes/session');
const productosRouter = require('./routes/productos');
const indexRouter = require('./routes/chat');
app.use('/', sessionRouter)
app.use('/', productosRouter);
app.use('/', indexRouter)

const PORT = process.env.PORT || 3030;

const server = http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

server.on('error', error => {
    console.log('error en el servidor:', error);
});
