const express = require('express')
const router = express.Router()
const { getRankById, getUserByUsernameAndPassword, getCategories, success, failure, tokenGenerator, setTokenForUserID, getTokenForUserID } = require('../utils.js')

router.get('/category/list', async (req, res) => {
  try {
    const response = await getCategories()
    res.send(success(undefined, {
      categories: response
    }))
  } catch (error) {
    res.send(failure())
  }
})

router.get('/rank/:id', async (req, res) => {
  try {
    const response = await getRankById(req.params.id)
    res.send(response[0])
  } catch (error) {
    res.send(failure())
  }
})

router.post('/login', async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  if (username.length <= 0 || password.length <= 0) {
    res.send(failure(undefined, {
      username: 'Username cannot be empty!',
      password: 'Password cannot be empty!'
    }))
  } else {
    const response = await getUserByUsernameAndPassword(username, password)
    if (response !== undefined && response.length > 0) {
      const token = tokenGenerator()
      const username = response[0].username
      const id = response[0].id
      const rank = response[0].rank
      await setTokenForUserID(id, token)
      res.send(success(undefined, {
        username: username,
        id: id,
        token: token,
        rank: rank
      }))
    } else {
      res.send(failure(undefined, {
        username: 'Username not found!'
      }))
    }
  }
})

router.get('/logged/user/:id/token/:token', async (req, res) => {
  const id = req.params.id
  const token = req.params.token
  if (!id && !token) {
    res.send(failure())
  } else {
    const response = await getTokenForUserID(id)
    if (response !== undefined && response.length > 0) {
      res.send(success(undefined, {
        id: response[0].id,
        username: response[0].username,
        token: response[0].token,
        rank: response[0].rank
      }))
    } else {
      res.send(failure())
    }
  }
})

module.exports = router