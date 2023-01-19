import { mensajesDao } from '../daos/index.js';

class MensajeService {
      constructor() {}

      async getAllMessages() {
            return await mensajesDao.getAll();
      }

      async PostMessage(dato) {
            await mensajesDao.postItem(dato);
            return dato;
      }
}
export default new MensajeService();