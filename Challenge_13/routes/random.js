const express = require('express');
const { fork } = require('child_process');
const router = express.Router();

router.get('/randoms', async (req, res, next) => {
      try {
            let cont = req.query.cant || 100000000;
            const computo = fork('controller/calculo.js', [cont]);
            computo.on('message', (data) => {
                  computo.send('Calculando numeros randoms.....');

                  res.json(data);
            });
      } catch (error) {
            next(error);
      }
});

module.exports = router;