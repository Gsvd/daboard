const express = require('express')
const router = express.Router()

router.use('/news', require('./news'))
router.use('/admin', require('./admin'))
router.use('/scheduler', require('./scheduler'))

module.exports = router