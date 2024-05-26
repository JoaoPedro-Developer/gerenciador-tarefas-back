import express from 'express'
import { TaskController } from '../controllers/task.controller.js'

export const router = express.Router()

router.get('/', async (req, res) => {
    return new TaskController(req,res).getAll()

})

router.get('/:id', async (req, res) => {
    return new TaskController(req,res).getById()
})

router.post('/', async (req, res) => {
    return new TaskController(req,res).create()
})

router.patch('/:id', async (req, res) => {
    return new TaskController(req,res).update()
})

router.delete('/:id', async (req, res) => {
    return new TaskController(req,res).delete()
})
