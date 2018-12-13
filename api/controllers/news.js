const express = require('express')
const router = express.Router()
const { getPosts, getPost, addPost, deletePost, updatePost, success, failure, authenticateRequest } = require('../utils.js')

router.get('/', (req, res) => {
  res.send('It Works: News!')
})

router.get('/list', async (req, res) => {
  try {
    const posts = await getPosts()
    res.send(success(undefined, posts))
  } catch (error) {
    res.send(failure())
  }
})

router.put('/add', async (req, res, next) => {
  const authenticate = await authenticateRequest(req)
  if (authenticate) {
    next()
  } else {
    res.status(403).send('Forbidden')
  }
}, async (req, res, next) => {
  const title = req.body.title
  const content = req.body.content
  const category = req.body.category
  const author = req.body.author
  if (title.length <= 0 || content.length <= 0) {
    res.send(failure(undefined, {
      title: 'Title cannot be empty!',
      content: 'Content cannot be empty!'
    }))
  } else {
    try {
      const response = await addPost(title, content, category, author)
      res.send(success())
    } catch (error) {
      res.send(failure())
    }
  }
})

router.delete('/delete', async (req, res, next) => {
  const authenticate = await authenticateRequest(req)
  if (authenticate) {
    next()
  } else {
    res.status(403).send(failure())
  }
}, async (req, res, next) => {
  const id = req.body.id
  if (id === undefined) {
    res.send(failure())
  } else {
    try {
      const response = await deletePost(id)
      res.send(success())
    } catch (error) {
      res.send(failure())
    }
  }
})

router.get('/get/:id', async (req, res) => {
  const id = req.params.id
  if (id === undefined) {
    res.send(failure())
  } else {
    try {
      const post = await getPost(id)
      res.send(success(undefined, post))
    } catch (error) {
      res.send(failure())
    }
  }
})

router.post('/update/:id', async (req, res, next) => {
  const authenticate = await authenticateRequest(req)
  if (authenticate) {
    next()
  } else {
    res.status(403).send(failure())
  }
}, async (req, res, next) => {
  const id = req.params.id
  const title = req.body.title
  const content = req.body.content
  const category = req.body.category
  const author = req.body.author
  if (id === undefined) {
    res.send(failure())
  } else {
    try {
      const post = await updatePost(id, title, content, category, author)
      res.send(success())
    } catch (error) {
      res.send(failure())
    }
  }
})

module.exports = router