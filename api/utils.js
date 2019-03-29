const showdown = require('showdown')
const moment = require('moment')
const axios = require('axios')
const qs = require('qs')

const db = require('./db')

// REQUEST OBJECTS

function bodyBuilder (success, information, answer) {
  return {
    success,
    information,
    answer
  }
}

function success (information = '', answer = {}) {
  return bodyBuilder(true, information, answer)
}

function failure (information = '', answer = {}) {
  return bodyBuilder(false, information, answer)
}

// UTILS FUNCTIONS

function specialChars (string) {
  return string.replace(/'/g, '&#39;').replace(/"/g, '&quot;')
}

// DATABASE FUNCTIONS

function setTokenForUserID (id, token) {
  return new Promise((resolve) => {
    const query = `UPDATE users SET token = '${token}' WHERE id = '${id}' LIMIT 1`
    db.query(query, function (error, result, fields) {
      if (error) throw error
      resolve(result)
    })
  })
}

function getTokenForUserID (id) {
  return new Promise((resolve) => {
    const query = `SELECT id, username, token, rank FROM users WHERE id = '${id}'`
    db.query(query, function (error, result, fields) {
      if (error) throw error
      resolve(result)
    })
  })
}

function getUserByUsernameAndPassword (username, password) {
  return new Promise((resolve) => {
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}' LIMIT 1`
    db.query(query, function (error, result, fields) {
      if (error) throw error
      resolve(result)
    })
  })
}

function getPosts () {
  return new Promise((resolve) => {
    const query = 'SELECT * FROM posts ORDER BY id DESC'
    db.query(query, function (error, result, fields) {
      if (error) throw error
      resolve(result)
    })
  })
}

function addPost (title, content, category, author) {
  const converter = new showdown.Converter()
  return new Promise((resolve) => {
    let today = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    content = specialChars(content)
    const query = `INSERT INTO posts(title, content, html, author, category, creation) VALUES('${title}', '${content}', '${converter.makeHtml(content)}', '${author}', '${category}', '${today}')`
    db.query(query, function (error, result, fields) {
      if (error) throw error
      resolve(result)
    })
  })
}

function deletePost (id) {
  return new Promise((resolve) => {
    const query = `DELETE FROM posts WHERE id = ${id}`
    db.query(query, function (error, result, fields) {
      if (error) throw error
      resolve(result)
    })
  })
}

function getPost (id) {
  return new Promise((resolve) => {
    const query = `SELECT * FROM posts WHERE id = ${id}`
    console.log(query)
    db.query(query, function (error, result, fields) {
      if (error) throw error
      resolve(result)
    })
  })
}

function updatePost (id, title, content, category, author) {
  const converter = new showdown.Converter()
  return new Promise((resolve) => {
    let today = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    content = specialChars(content)
    const query = `UPDATE posts SET title = '${title}', content = '${content}', html = '${converter.makeHtml(content)}', author = '${author}', category = '${category}', creation = '${today}' WHERE id = ${id}`
    db.query(query, function (error, result, fields) {
      if (error) throw error
      resolve(result)
    })
  })
}

function getCategories () {
  return new Promise((resolve) => {
    const query = 'SELECT * FROM categories ORDER BY id ASC'
    db.query(query, function (error, result, fields) {
      if (error) throw error
      resolve(result)
    })
  })
}

function getRankById (id) {
  return new Promise((resolve) => {
    const query = `SELECT label FROM ranks WHERE id = '${id}'`
    db.query(query, function (error, result, fields) {
      if (error) throw error
      resolve(result)
    })
  })
}

function getTokenAPIForAddress (address, token) {
  return new Promise((resolve) => {
    const query = `SELECT * FROM auth WHERE token = '${token}' AND addressV4 = '${address}' OR addressV6 = '${address}' LIMIT 1`
    db.query(query, function (error, result, fields) {
      if (error) throw error
      resolve(result)
    })
  })
}

function refreshOAuth () {
  return new Promise((resolve) => {
    axios.post('https://sso.supinfo.com/connect/token', qs.stringify({
      grant_type: 'client_credentials',
      scope: 'Booster.Api',
      client_id: process.env.OAUTH_ID,
      client_secret: process.env.OAUTH_SECRET,
      username: process.env.OAUTH_USERNAME,
      password: process.env.OAUTH_PASSWORD
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
      resolve(response)
    })
      .catch((error) => {
        console.log(error)
      })
  })
}

module.exports = {
  bodyBuilder,
  success,
  failure,
  getUserByUsernameAndPassword,
  setTokenForUserID,
  getTokenForUserID,
  getPosts,
  addPost,
  deletePost,
  updatePost,
  getPost,
  getCategories,
  getTokenAPIForAddress,
  getRankById,
  refreshOAuth
}
