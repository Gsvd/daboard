const express = require('express')
const router = express.Router()

router.use('/news', require('./news'))
router.use('/admin', require('./admin'))

router.get('/', (req, res) => {
  res.send('It Works!')
})

module.exports = router