const express = require('express')
const router = express.Router()
const { refreshOAuth } = require('../utils.js')

router.get('/', async (req, res) => {
  refreshOAuth().then((response) => {
    const bearer = response['data'].access_token
    res.send(bearer)
  })
    .catch((error) => {
      res.send(error)
    })
})

module.exports = router
