const express = require('express')
const router = express.Router()
const { getUserByUsernameAndPassword, getCategories, success, failure } = require('../utils.js')

router.get('/', (req, res) => {
  res.send('It Works: News!')
})

router.get('/category/list', async (req, res) => {
  try {
    const dbResult = await getCategories()
    res.send(success(undefined, {
      categories: dbResult
    }))
  } catch (error) {
    res.send(failure())
  }
})

router.post('/signin', async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  if (username.length <= 0 || password.length <= 0) {
    res.send(failure(undefined, {
      username: 'Username cannot be empty!',
      password: 'Password cannot be empty!'
    }))
  } else {
    const dbResult = await getUserByUsernameAndPassword(username, password)
    if (dbResult !== undefined && dbResult.length > 0) {
      res.send(success(undefined, {
        username: dbResult[0].username
      }))
    } else {
      res.send(failure(undefined, {
        username: 'Username not found!'
      }))
    }
  }
})

module.exports = router