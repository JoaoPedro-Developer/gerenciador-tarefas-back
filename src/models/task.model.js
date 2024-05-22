const { Schema, Model } = require('mongoose')

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

const TaskModel = Model('Task', TaskSchema)
module.exports = TaskModel