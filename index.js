import express from 'express'
import dotenv from 'dotenv'
import { connecToDatabase } from './src/database/mongoose.database.js'
import { router as TaskRouter }  from './src/routes/task.routes.js'

dotenv.config()
const app = express()
app.use(express.json())

connecToDatabase()

app.use('/tasks', TaskRouter)

app.listen(8000, () => {
    console.log('Listenin on port 8000')
})