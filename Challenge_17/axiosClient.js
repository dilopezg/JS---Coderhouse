import axios from 'axios';

let id;
const responseGet = await axios.get('http://localhost:8080/api/productos');

console.log('GET:', responseGet.data);

const responPost = await axios.post('http://localhost:8080/api/productos', {
    nombre: 'test',
    imagen: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-512.png',
    precio: 10,
});

id = await responPost.data.id;

const responseGetbyId = await axios.get(
    `http://localhost:8080/api/productos/${id}`
);
console.log('');
console.log('GetById:', responseGetbyId.data);

const responsePut = await axios.put(`http://localhost:8080/api/productos`, {
    id: id,
    nombre: 'test',
    imagen: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-512.png',
    precio: 20,
});
console.log('PUT:', responsePut.data);

const responseDelete = await axios.delete(
    `http://localhost:8080/api/productos/${id}`
);
console.log('Delete:', responseDelete.data);