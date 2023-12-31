const { MongoClient } = require("mongodb");
require('dotenv').config()

const client = new MongoClient(process.env.CONNECTION_STRING)

const PORT = process.env.PORT || 3000

const start = async () => {
    await client.connect()
    module.exports = client.db('EMPLOYEES_DATA').collection('employeeData')
    const app = require('./app')
    app.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}`);
    })
}

start()
