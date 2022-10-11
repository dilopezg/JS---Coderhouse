(function () {
    const formMessage = document.getElementById('form-message');
    const inputEmail= document.getElementById('input-email');
    const inputMessage = document.getElementById('input-message');
    const listMessages = document.getElementById('list-messages');
    
    let messages = [];
      
    const socket = io();
  
    function showMessage(data) {
      const li = document.createElement('li');
      console.log(data)
      li.innerHTML = `
      <div>
      <em class="text-primary font-weight-bolder">${data.email}</em>
      [<em class="text-danger">${data.time}</em>]: <em class="text-success fst-italic">${data.message}</em>
      </div>`;
      listMessages.appendChild(li);
    }
  
    formMessage.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = {
        email: inputEmail.value,
        message: inputMessage.value,
      };
      socket.emit('new-message', data);
      inputMessage.value = '';
      inputMessage.focus();
    });
  
    socket.on('connect', () => {
      console.log('Conectados al servidor');
    });
  
    socket.on('history-messages', (data) => {
      messages = data;
      listMessages.innerText = '';
      messages.forEach((message) => {
        showMessage(message)
      })
    });
  
    socket.on('notification', (data) => {
      data.time = new Date().toLocaleString();
      messages.push(data);
      showMessage(data);
    });
    
})();
  
const socket = io.connect();

socket.on('productos', function (productos) {
    console.log('productos socket client')
    document.getElementById('datos').innerHTML = data2TableHBS(productos)
});

const form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault();
    const data = { title: form[0].value, price: form[1].value, thumbnail: form[2].value };

    fetch('/api/productos/guardar', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(respuesta => respuesta.json())
    .then(productos => {
        form.reset();
        socket.emit('update', 'ok');
    })
    .catch(error => {
        console.log('ERROR', error);
    });
});

function data2TableHBS(productos) {
    const plantilla = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>

        {{#if productos.length}}
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                </tr>
                {{#each productos}}
                <tr>
                    <td>{{this.title}}</td>
                    <td>$ {{ this.price }}</td>
                    <td><img width="50" src={{this.thumbnail}} alt="not found"></td>
                </tr>
                {{/each}}
            </table>
        </div>
        {{/if}}
    `

    console.log(productos);
    var template = Handlebars.compile(plantilla);
    let html = template({ productos: productos, hayProductos: productos.length });
    return html;
}
