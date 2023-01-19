import { productosDao } from '../daos/index.js';

class ProductoService {
      constructor() {}

      async listar() {
            return productosDao.listar();
      }

      async generar() {
            return productosDao.generar();
      }

      async guardar(data) {
            await productosDao.guardar(data);
            return data;
      }

      async borrar(id) {
            await productosDao.borrar(id);
            return id;
      }
      async buscarPorId(id) {
            const producto = await productosDao.buscarPorId(id);
            return producto;
      }
      async actualizar(id, data) {
            await productosDao.actualizar(id, data);
      }
}
export default new ProductoService();