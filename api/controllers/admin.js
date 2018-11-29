const express = require('express')
const router = express.Router()
const { getUserByUsernameAndPassword } = require('../utils.js')

router.post('/signin', async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const dbResult = await getUserByUsernameAndPassword(username, password)
  if (dbResult !== undefined && dbResult.length > 0) {
    console.log('USER FOUND!')
  } else {
    console.log('USER NOT FOUND!')
  }
})

module.exports = router