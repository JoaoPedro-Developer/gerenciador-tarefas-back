const express = require('express')
const dotenv = require('dotenv')

const connecToDatabase = require('./src/database/mongoose.database')

dotenv.config()
const app = express()

connecToDatabase()

app.get('/', (req, res) => {
    const tasks = [{
        description: 'Estudar Programação',
        isCompleted: false
    }]
    res.status(200).send(tasks)
})

app.listen(8000, () => {
    console.log('Listenin on port 8000')
})