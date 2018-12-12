const express = require('express')
const router = express.Router()

router.use(function (req, res, next) {
  if (req.headers.authorization === 'basic j"Vc8]/@!-(U8W#') {
    next()
  } else {
    res.status(403).send('Forbidden')
  }
})

router.use('/news', require('./news'))
router.use('/admin', require('./admin'))

router.get('/', (req, res) => {
  res.send('It Works!')
})

module.exports = router