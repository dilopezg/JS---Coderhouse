const { Server } = require('socket.io')

let io

const mensajes = []

class Socket {
  init(httpServer) {
    console.log('Configurando el socket')
    io = new Server(httpServer);    

    io.on('connection', (clienteSocket) => {
      console.log('Nuevo cliente conectado', clienteSocket.id);      
      
      clienteSocket.emit("messages", messages);
      clienteSocket.on("new-message", (data) => {
        data.time = new Date().toLocaleString();
        messages.push(data);
        io.sockets.emit("messages", [data]);
      });
      
    })
  }
}

module.exports = Socket;