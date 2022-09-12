const fs = require('fs')
  



class Contenedor{
    
    constructor(archivo){
        this.archivo = archivo
    }

     async leerArchivo (ruta){
        try {
            const data = await fs.promises.readFile(ruta, 'utf-8')
        return JSON.parse(data)
      } catch (error) {
        return []
      }
    }

     async escribirArchivo (ruta, contenido){
        try {
            await fs.promises.writeFile(ruta, contenido, 'utf-8')
        } catch (error) {
            console.log('😱 Ocurrio un error durante la escritura:', error);
            throw new Error(error.message)
        }
    }
    

    async save (newProducto){

        try {
            const objeto = {...newProducto}
            const contenidoJSON = await this.leerArchivo(this.archivo)
            const lengthIdList = contenidoJSON.map(item =>item.Id).length
            const lastId = contenidoJSON.map(item =>item.Id)[lengthIdList-1]
            

            if (contenidoJSON.length === 0){
                objeto['Id'] = 1
                contenidoJSON.push(objeto)
                await this.escribirArchivo(this.archivo, JSON.stringify(contenidoJSON, null, 2))
                console.log(`Se agrego exitosamente el producto con Id: ${objeto['Id']}`)
            }

            else{
                objeto['Id'] = lastId + 1
                contenidoJSON.push(objeto)
                await this.escribirArchivo(this.archivo, JSON.stringify(contenidoJSON, null, 2))
                console.log(`Se agrego exitosamente el producto con Id: ${objeto['Id']}`)
            }

            }

            catch (error) {
            console.log('😱😱😱 Ocurrion un error durante la operación y no se pudo agregar el producto:', error);
        }
     }

    
    async getById (numberId) {

        try {
                
            const contenidoJSON = await this.leerArchivo(this.archivo)
            const idList = contenidoJSON.map(item =>item.Id)
            const indexId = (contenidoJSON.map(item =>item.Id)).indexOf(numberId)
            if (idList.includes(numberId)){
                console.log(contenidoJSON[indexId])
            }
            else{
                console.log(null)
            }

        }

           catch (error) {
               console.log('😱😱😱 Ocurrion un error durante la operación get by Id', error);

           }
        

    }

    async getAll(){
        try {
                      
            const contenidoJSON = await this.leerArchivo(this.archivo)
            console.log(contenidoJSON)

        }
            catch (error) {
           console.log('😱😱😱 Ocurrion un error durante la operación get all', error);

            }
    }

    async deleteById(numberId){
        try{
            const contenidoJSON = await this.leerArchivo(this.archivo)
            const indexDelete = (contenidoJSON.map(item =>item.Id)).indexOf(numberId)
            contenidoJSON.splice(indexDelete,indexDelete+1)
            await this.escribirArchivo(this.archivo, JSON.stringify(contenidoJSON, null, 2))
            console.log(`Se borro exitosamente el producto con Id: ${numberId}`)

        }
        
            catch (error) {
                console.log('😱😱😱 Ocurrion un error durante la operación delete by Id', error);

            }
        

    }
    async deleteAll(){
        try{
            await this.escribirArchivo(this.archivo, JSON.stringify([], null, 2))
            console.log(`Se borrarron exitosamente todos los productos `)

        }
        
            catch (error) {
                console.log('😱😱😱 Ocurrion un error durante la operación delete all', error);

            }
    }

}




async function main() {

    const contenedor = new Contenedor('./productos.txt')

    await contenedor.save({ 'title': 'Escuadra','price': 123.45,'thumbnail': 'https:.......',})
    await contenedor.save({ 'title': 'Calculadora', 'price': 234.56, 'thumbnail': 'https:.......',})
    await contenedor.save({ 'title': 'Globo Terraqueo', 'price': 345.67, 'thumbnail': 'https:.......',})
    //await contenedor.getById(3)
    //await contenedor.getAll()
    //await contenedor.deleteById(1)
    //await contenedor.deleteAll()

}

main()



