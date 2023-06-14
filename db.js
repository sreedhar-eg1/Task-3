const { MongoClient } = require("mongodb");

<<<<<<< HEAD
const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.upccyc9.mongodb.net/EMPLOYEES_DATA`)
=======
>>>>>>> f047093f95868949e21dfcf508a94eaabbb42970
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
