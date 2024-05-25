const express = require('express')
const dotenv = require('dotenv')

const connecToDatabase = require('./src/database/mongoose.database')
const TaskRouter = require('./src/routes/task.routes')

dotenv.config()
const app = express()
app.use(express.json())

connecToDatabase()

app.use('/tasks', TaskRouter)

app.listen(8000, () => {
    console.log('Listenin on port 8000')
})