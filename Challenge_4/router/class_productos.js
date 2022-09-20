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
                return objeto
            }

            else{
                objeto['Id'] = lastId + 1
                this.productos.push(objeto)
                return objeto
            }

        }

        catch (error) {
            console.log('😱😱😱 Ocurrion un error durante la operación y no se pudo agregar el producto:', error);
        }
     }

    
    getById (numberId) {

        try {
            const idList = this.productos.map(item =>item.Id)
            const indexId = (this.productos.map(item =>item.Id)).indexOf(numberId)
            
            if (idList.includes(numberId)){
                return this.productos[indexId];
            }
            else{
                return ({error: 'producto no encontrado'});
            }
        }

           catch (error) {
               console.log('😱😱😱 Ocurrion un error durante la operación get by Id', error);
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

    deleteById(numberId){
        try{
            const idList = this.productos.map(item =>item.Id)
            const indexId = (this.productos.map(item =>item.Id)).indexOf(numberId)
            if (idList.includes(numberId)){
                this.productos.splice(indexId,1)
                return ({Eliminado_Id: numberId});
            }
            else{
                return({error: 'producto no encontrado'});
            }
        }
        
            catch (error) {
                console.log('😱😱😱 Ocurrion un error durante la operación delete by Id', error);
            }       

    }
    updateById(data,numberId){
        try{
            const objeto = {...data}
            objeto['Id']= numberId
            const idList = this.productos.map(item =>item.Id)
            const indexId = (this.productos.map(item =>item.Id)).indexOf(numberId)
            if (idList.includes(numberId)){
                this.productos[indexId] = objeto
                return ({Actualizado_Id: numberId });
            }
            else{
                return ({error: 'producto no encontrado'});
            }
        }
        
            catch (error) {
                console.log('😱😱😱 Ocurrion un error durante la operación delete all', error);
            }
    }

}



module.exports = Productos;




