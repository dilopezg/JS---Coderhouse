const fs = require('fs')
  
class Productos{
    
    constructor(){
        this.productos = []
    }

    save (data){

        try {
            const objeto = {...data}    
            const lengthIdList = this.productos.map(item =>item.Id).length
            const lastId = this.productos.map(item =>item.Id)[lengthIdList-1]
                        

            if (this.productos.length === 0){
                objeto['Id'] = 1
                this.productos.push(objeto)                
                return objeto;
            }

            else{
                objeto['Id'] = lastId + 1
                this.productos.push(objeto)                
                return objeto;
            }

        }

        catch (error) {
            console.log('😱😱😱 Ocurrion un error durante la operación y no se pudo agregar el producto:', error);
        }
     }

    
    

    getAll(){
        try {
                     
            return this.productos           

        }
            catch (error) {
           console.log('😱😱😱 Ocurrion un error durante la operación get all', error);
            }
    }
}
    



module.exports = Productos;

