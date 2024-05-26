import mongoose from 'mongoose'
import { notAllowedFieldsToUpdateError } from '../errors/general.errors.js'
import { notFoundError, objectIdCastError } from '../errors/mongodb.error.js'
import { TaskModel } from '../models/task.model.js'

export class TaskController {
    constructor (req, res) {
        this.req = req
        this.res = res
    }

    async getAll () {
        try {
            const tasks = await TaskModel.find({})
            return this.res.status(200).send(tasks)
        }
        catch (error) {
            return this.res.status(500).send(error.message)
        }
    }

    async getById () {
        try {
            const taskId = this.req.params.id
            const task = await TaskModel.findById(taskId)
            if (!task) {
                return notFoundError(this.res)
            }
            this.res.status(200).send(task)
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) return objectIdCastError(this.res)
            return this.res.status(500).send(error.message)
        }
    }

    async create () {
        try {
            const newTask = new TaskModel(this.req.body)
            await newTask.save()
            return this.res.status(201).send(newTask)
        } catch(error) {
            return this.res.status(500).send(error.message)
        }
    }

    async update () {
        try {
            const taskId = this.req.params.id
            const taskData = this.req.body
            const taskToUpdate = await TaskModel.findById(taskId)
            if (!taskToUpdate) return notFoundError(this.res)
            const allowedUpdated = ['isCompleted']
            const requestedUpdates = Object.keys(taskData)
            for (const update of requestedUpdates) {
                if (allowedUpdated.includes(update)) {
                    taskToUpdate[update] = taskData[update]
                } else {
                    return notAllowedFieldsToUpdateError(this.res)
                }
            }
            await taskToUpdate.save()
            return this.res.status(200).send(taskToUpdate)
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) return objectIdCastError(this.res)
            return this.res.status(500).send(error.message)
        }
    }

    async delete () {
        try {
            const taskId = this.req.params.id
            const taskToDelete = await TaskModel.findById(taskId)
            if (!taskToDelete) {
                return notFoundError(this.res)
            }
            const deletedTask = await TaskModel.findByIdAndDelete(taskId)
            return this.res.status(200).send(deletedTask)
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) return objectIdCastError(this.res)
            return this.res.status(500).send(error.message)
        }
    }
}