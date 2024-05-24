const express = require('express')
const dotenv = require('dotenv')

const connecToDatabase = require('./src/database/mongoose.database')
const TaskModel = require('./src/models/task.model')
dotenv.config()
const app = express()
app.use(express.json())

connecToDatabase()

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await TaskModel.find({})
        res.status(200).send(tasks)
    }
    catch (error) {
        res.status(500).send(error.message)
    }

})

app.post('/tasks', async (req, res) => {
    try {
        const newTask = new TaskModel(req.body)
        await newTask.save()
        res.status(201).send(newTask)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

app.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id
        const taskToDelete = await TaskModel.findById(taskId)
        if (!taskToDelete) {
            res.status(500).send('Tarefa não encontrada')
        }
        const deletedTask = await TaskModel.findByIdAndDelete(taskId)
        res.status(200).send(deletedTask)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.listen(8000, () => {
    console.log('Listenin on port 8000')
})