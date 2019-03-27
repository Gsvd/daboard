const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(helmet())
app.use(morgan('dev'))
app.use(bodyParser.json())

//ALLOW API CALLS FROM RESTRICTED HOSTS
app.use(cors({
  origin: ['http://localhost:8080', 'http://10.10.18.5:8080']
}))

app.use(require('./controllers'))

var port = process.env.PORT || 3000

app.listen(port, function() {
  console.log('Listening on port ' + port)
})