const express = require('express')
const router = express.Router()
const { getUserByUsernameAndPassword, success, failure } = require('../utils.js')

router.post('/signin', async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const dbResult = await getUserByUsernameAndPassword(username, password)
  if (dbResult !== undefined && dbResult.length > 0) {
    res.send(success())
  } else {
    res.send(failure())
  }
})

module.exports = router