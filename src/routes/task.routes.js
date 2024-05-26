import express from 'express'
import { TaskModel } from '../models/task.model.js'
import { TaskController } from '../controllers/task.controller.js'

export const router = express.Router()

router.get('/', async (req, res) => {
    return new TaskController(req,res).getTasks()

})

router.get('/:id', async (req, res) => {
    try {
        const taskId = req.params.id
        const task = await TaskModel.findById(taskId)
        if (!task) {
           return res.status(404).send('Tarefa não encontrada')
        }
        res.status(200).send(task)
    }
    catch (error) {
        res.status(500).send(error.message)
    }

})

router.post('/', async (req, res) => {
    try {
        const newTask = new TaskModel(req.body)
        await newTask.save()
        res.status(201).send(newTask)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const taskId = req.params.id
        const taskData = req.body
        const taskToUpdate = await TaskModel.findById(taskId)
        const allowedUpdated = ['isCompleted']
        const requestedUpdates = Object.keys(taskData)
        for (const update of requestedUpdates) {
            if (allowedUpdated.includes(update)) {
                taskToUpdate[update] = taskData[update]
            } else {
                return res.status(500).send('Um ou mais campos não são editaveis')
            }
        }
        await taskToUpdate.save()
        return res.status(200).send(taskToUpdate)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const taskId = req.params.id
        const taskToDelete = await TaskModel.findById(taskId)
        if (!taskToDelete) {
            res.status(404).send('Tarefa não encontrada')
        }
        const deletedTask = await TaskModel.findByIdAndDelete(taskId)
        res.status(200).send(deletedTask)
    } catch (error) {
        res.status(500).send(error.message)
    }
})
