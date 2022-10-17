class Producto {

    constructor() {
        this.productos = [
            {
                title: 'mochila',
                price: '100',
                thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-256.png',
                id: 1
              }
        ];
    }

    listar() {
        return this.productos;
    }

    buscarPorId(id) {
        let producto = this.productos.find(p => p.id === id);
        return producto || { error: `producto con id ${id} no encontrado`};
    }

    guardar(producto) {
        producto.id = this.productos.length + 1;
        return this.productos.push(producto);
    }

    actualizar(id, datos) {
        datos.id = Number(id);
        let index = this.productos.findIndex(p => p.id === id);
        this.productos.splice(index, 1, datos);
        return this.productos;
    }

    borrar(id) {
        let index = this.productos.findIndex(p => p.id === id);
        return this.productos.splice(index, 1);
    }
}

module.exports = new Producto();