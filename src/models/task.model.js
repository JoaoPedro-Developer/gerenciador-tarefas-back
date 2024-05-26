import { Schema, model } from 'mongoose'  

const TaskSchema = Schema({
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
})

export const TaskModel = model('Task', TaskSchema)