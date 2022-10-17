(function () {
    const formProduct = document.getElementById('form-Product');
    const formMessage = document.getElementById('form-message');
    const inputEmail= document.getElementById('input-email');
    const inputMessage = document.getElementById('input-message');
    const listMessages = document.getElementById('list-messages');
    
    let messages = [];
    let productos = [];
      
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


    function data2TableHBS(productos){
        return fetch('plantilla/lista.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla =>{
            const template = Handlebars.compile(plantilla);
            const html = template ({productos})
            return html
            
        })
    }
        
    formProduct.addEventListener('submit', event => {
        event.preventDefault();
        const data = { 
            title: formProduct[0].value, 
            price: formProduct[1].value, 
            thumbnail: formProduct[2].value };
        socket.emit('new-producto', data);
        console.log(data);
    });

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
    
    socket.on('productos', productos => {
        data2TableHBS(productos).then(html => {
            document.getElementById('datos').
                innerHTML = html            
        })       
    });
    
        
    
})();