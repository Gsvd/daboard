const express = require('express')
const router = express.Router()
const { getPosts, addPost, success, failure } = require('../utils.js')

router.get('/', (req, res) => {
  res.send('It Works: News!')
})

router.get('/list', async (req, res) => {
  try {
    const posts = await getPosts()
    res.send(success(answer = posts))
  } catch (error) {
    res.send(failure())
  }
})

router.post('/add', async (req, res) => {
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

module.exports = router