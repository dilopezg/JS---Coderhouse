import fs from "fs";
import  {faker} from '@faker-js/faker';
faker.locale = 'es';
import config from '../config.js'
const { commerce, image } = faker;
  
class ContenedorMemoria {
    
    constructor(){
        this.ruta = []
    }

    async escribirArchivo(ruta, contenido) {
        try {
              await fs.writeFileSync(
                    ruta,
                    JSON.stringify(contenido, null, 2),
                    "utf-8"
              );
        } catch (error) {
              console.log(error.message);
        }
  }

    async leerArchivo(ruta) {
            try {
                const data = await fs.readFileSync(ruta, "utf-8");
                
                return JSON.parse(data);
                
            } catch (error) {
                console.log(error.message);
            }
    }

    saberSiExiste(ruta) {
            try {
                if (!fs.existsSync(ruta)) {
                        throw new Error("El archivo no se encontro!!");
                } else {
                        return true;
                }
            } catch (error) {
                console.log(error.message);
            }
    }

    async save(message) {
        try {

            if (!this.saberSiExiste(this.ruta)) {

                    let arrayMessages = [];

                    arrayMessages.push(message);

                    await this.escribirArchivo(this.ruta, arrayMessages);

                    return;
            } else {

                    if (this.leerArchivo(this.ruta)) {
                        const data = await this.leerArchivo(this.ruta);

                        data.push(message);

                        this.escribirArchivo(this.ruta, data);
                    }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async getAll() {
        try {

            if (this.saberSiExiste(this.ruta)) {
                    const data = await this.leerArchivo(this.ruta);

                    if (data.length !== 0) {
                        return data;
                    } else {
                        
                        throw new Error(
                                `el archivo ${this.ruta} esta vacio`
                        );
                    }
            }
        } catch (error) {
            console.log(error.message);
        }   
    }

    async generar() {
        for (let index = 0; index < parseInt(5); index++) {            
            const productos = await this.leerArchivo(this.ruta);
            productos.push({
            id: index + 1,
            title: commerce.product(),
            price: Number(commerce.price()),
            thumbnail: image.imageUrl(),
            });
            this.escribirArchivo(this.ruta, productos)
        }
        return this.listar();
      }

    async listar() {
        return await this.leerArchivo(this.ruta);
    }

   
    async guardar(producto) {
        const productos = await this.leerArchivo(this.ruta)
        producto.id = productos.length + 1;
        productos.push(producto)
        this.escribirArchivo(this.ruta, productos)
        return productos;
    }

}

export default ContenedorMemoria;

