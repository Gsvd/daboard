const express = require('express')
const router = express.Router()

router.use(function (req, res, next) {
  if (req.body.token === 'development') {
    next()
  } else {
    res.status(403).send('Forbidden')
  }
})

router.use('/news', require('./news'))

router.get('/', (req, res) => {
  res.send('It Works!')
})

module.exports = router