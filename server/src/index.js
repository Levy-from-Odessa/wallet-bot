const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('../config/index')


const app = express()


app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


require('./routes/tags')(app)
require('./routes/operations')(app)


sequelize.sync({force: true})
	.then(() => {
		app.listen(config.port)
		console.log(config.port)
	})