const mysql = require('mysql')
const showdown = require('showdown')
const moment = require('moment')

//REQUEST OBJECTS

function bodyBuilder(success, information, answer) {
    return {
        success,
        information,
        answer
    }
}

function success(information = '', answer = {}) {
    return bodyBuilder(true, information, answer)
}

function failure(information = '', answer = {}) {
    return bodyBuilder(false, information, answer)
}

const db = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'daboard'
})

//DATABASE FUNCTIONS

function getUserByUsernameAndPassword(username, password) {
    return new Promise((resolve) => {
        const query = 'SELECT * FROM users WHERE username = "' + username + '" AND password = "' + password + '" LIMIT 1'
        db.query(query, function (error, result, fields) {
            resolve(result)
        })
    })
}

function getPosts() {
    return new Promise((resolve) => {
        const query = 'SELECT * FROM posts ORDER BY id DESC'
        db.query(query, function (error, result, fields) {
            resolve(result)
        })
    })
}

function addPost(title, content, category, author) {
    const converter = new showdown.Converter()
    return new Promise((resolve) => {
        let today = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        let newContent = content.replace(/'/g, '&#39;')
        const query = 'INSERT INTO posts(title, content, html, author, category, creation) VALUES(\'' + title + '\', \'' + newContent + '\', \'' + converter.makeHtml(newContent) + '\', \'' + author + '\', \'' + category + '\', \'' + today + '\')'
        db.query(query, function (error, result, fields) {
            resolve(result)
        })
    })
}

function getCategories() {
    return new Promise((resolve) => {
        const query = 'SELECT * FROM category ORDER BY id ASC'
        db.query(query, function (error, result, fields) {
            resolve(result)
        })
    })
}

module.exports = {
    bodyBuilder,
    success,
    failure,
    getUserByUsernameAndPassword,
    getPosts,
    addPost,
    getCategories
}