const express = require('express')
const router = express.Router()
const { getPosts, success, failure } = require('../utils.js')

router.get('/', (req, res) => {
  res.send('It Works: News!')
})

router.get('/list', async (req, res) => {
  const posts = await getPosts()
  res.send(success(answer = posts))
})

module.exports = router