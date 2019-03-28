const mysql = require('mysql')

const db = mysql.createPool({
  connectionLimit : 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'daboard'
})

module.exports = db