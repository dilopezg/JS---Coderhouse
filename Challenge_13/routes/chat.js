const { Router } = require('express')

let io

function emit(event, data) {
    io.emit(event, data)
  }

const router = Router()

router.post('/', (req, res) => {
  const { body } = req
  console.log('aviso', body);
  emit('notification', body)
  res.send('OK')
})

module.exports = router;