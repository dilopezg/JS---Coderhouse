const express = require('express')
const { Router } = express
const router = Router(Router)


const productos = []



router.post('/productos', (req, res) => {
  let { body : data } = req
  const objeto = {...data}
    
  const lengthIdList = productos.map(item =>item.Id).length
  const lastId = productos.map(item =>item.Id)[lengthIdList-1]
            

  if (productos.length === 0){
    objeto['Id'] = 1
    productos.push(objeto)
    console.log(`Se agrego exitosamente el producto con Id: ${objeto['Id']}`)
  }

  else{
    objeto['Id'] = lastId + 1
    productos.push(objeto)
    console.log(`Se agrego exitosamente el producto con Id: ${objeto['Id']}`)
  }

  res.status(200).json(objeto)
})

router.get('/productos', (_, res) => {
    res.status(200).json(productos)
    
})

router.get('/productos/:id', (req, res) => {

  
  const numberId = Number(req.params.id)
  const idList = productos.map(item =>item.Id)
  const indexId = (productos.map(item =>item.Id)).indexOf(numberId)
  console.log(idList)
  console.log(indexId)
  if (idList.includes(numberId)){
    res.status(200).json(productos[indexId]);
  }
  else{
    res.status(200).json({error: 'producto no encontrado'});
  }

})

router.put('/productos/:id', (req, res) => {
  let { body : data } = req
  const objeto = {...data}
  const numberId = Number(req.params.id)
  objeto['Id']= numberId
  const idList = productos.map(item =>item.Id)
  const indexId = (productos.map(item =>item.Id)).indexOf(numberId)
  if (idList.includes(numberId)){
    productos[indexId] = objeto
    res.status(200).json({Actualizado_Id: numberId });
  }
  else{
    res.status(200).json({error: 'producto no encontrado'});
  }
})

router.delete('/productos/:id', (req, res) => {
  const numberId = Number(req.params.id)
  const idList = productos.map(item =>item.Id)
  const indexId = (productos.map(item =>item.Id)).indexOf(numberId)
  if (idList.includes(numberId)){
    productos.splice(indexId,1)
  res.status(200).json({Eliminado_Id: numberId});
  }
  else{
    res.status(200).json({error: 'producto no encontrado'});
  }
  
})

module.exports = router