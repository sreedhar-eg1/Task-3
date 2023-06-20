const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
require('dotenv').config()

//npm package->excelJS


const employeeRouter = require('./routes/employees.router')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Get all employee details')
})

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(employeeRouter)

module.exports = app