const express = require('express');
const router = express.Router();

router.get('/info', (req, res, next) => {
    try {
          const data = {
                arg: process.argv.slice(2),
                os: process.platform,
                version: process.version,
                rss: process.memoryUsage().rss,
                path: process.execPath,
                pid: process.pid,
                folder: process.cwd(),
          };

          res.render('./info', data);
    } catch (error) {
          next(error);
    }
});

module.exports = router;