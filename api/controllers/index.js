const express = require('express')
const router = express.Router()

const { getTokenAPIForAddress } = require('../utils.js')

router.use(async (req, res, next) => {
  const address = req.connection.remoteAddress
  const token = req.headers.authorization.split(' ')[1]
  const response = await getTokenAPIForAddress(address, token)
  if (response[0] !== undefined && token === response[0].token) {
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