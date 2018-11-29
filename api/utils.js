const mysql = require('mysql')

//REQUEST OBJECTS

function bodyBuilder(success, information, answer) {
    return {
        success,
        information,
        answer
    }
}

function success(answer, information = '') {
    return bodyBuilder(true, information, answer)
}

function failure(information = '', answer = {}) {
    return bodyBuilder(false, information, answer)
}

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'daboard'
})

//DATABASE FUNCTIONS

function getUserByUsernameAndPassword(username, password) {
    return new Promise((resolve) => {
        db.connect(function (error) {
            const query = 'SELECT * FROM users WHERE username = "' + username + '" AND password = "' + password + '" LIMIT 1'
            db.query(query, function (error, result, fields) {
                resolve(result)
            })
        })
    })
}

module.exports = {
    bodyBuilder,
    success,
    failure,
    getUserByUsernameAndPassword
}