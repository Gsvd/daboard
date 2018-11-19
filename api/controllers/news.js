const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('It Works: News!')
})

router.get('/list', (req, res) => {
  res.send('It Works: News list!')
})

module.exports = router