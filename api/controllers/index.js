const express = require('express')
const router = express.Router()

router.use('/news', require('./news'))
router.use('/admin', require('./admin'))

module.exports = router