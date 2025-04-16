const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({

    taskId: {
        type: String,
        required: true
    },

    taskName: {
        type: String,
        required: false
    },

    createdBy: {
        type: String,
        required: true
    }

})

const Tasks = mongoose.model('Tasks',taskSchema)
module.exports = Tasks

