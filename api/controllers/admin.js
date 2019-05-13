const express = require('express')
const uuidv4 = require('uuid/v4')
const router = express.Router()
const { getRankById, getUserByUsernameAndPassword, getCategories, success, failure, setTokenForUserID, getTokenForUserID } = require('../utils.js')
const fs = require('fs')

const db = require('../db')

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

router.put('/user', async (req, res) => {
  const user = req.body.user
  try {
    const query = `INSERT INTO users(username, password, rank, creation) VALUES('${user.username}', '${user.hashed}', '${user.rank}', NOW())`
    db.query(query, function (error, result, fields) {
      if (error) console.log(error)
      res.send(success())
    })
  } catch (error) {
    res.send(failure())
  }
})

router.get('/ranks', async (req, res) => {
  try {
    const query = `SELECT * FROM ranks ORDER BY id DESC`
    db.query(query, function (error, result, fields) {
      if (error) console.log(error)
      res.send(result)
    })
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

router.get('/users', async (req, res) => {
  const query = `SELECT id, username, creation FROM users`
  db.query(query, function (error, result, fields) {
    if (error) console.log(error)
    res.send(result)
  })
})

router.delete('/user/:id', async (req, res) => {
  try {
    const query = `DELETE FROM users WHERE id = ${req.params.id}`
    db.query(query, function (error, result, fields) {
      if (error) console.log(error)
      res.send(success())
    })
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
      const token = uuidv4()
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

router.get('/configuration', async (req, res) => {
  fs.readFile('config/daboard.config.json', 'utf8', (err, data) => {
    if (err) throw err
    res.send(JSON.parse(data))
  })
})

router.post('/configuration', async (req, res) => {
  try {
    fs.writeFile('config/daboard.config.json', JSON.stringify(req.body.config), (err) => {
      if (err) throw err
      res.send(success(undefined, {}))
    })
  } catch (err) {
    res.send(failure())
  }
})

module.exports = router
