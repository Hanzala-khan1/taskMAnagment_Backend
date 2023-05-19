const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    task_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    title: {
        type: String,

    },
    description: {
        type: String,

    },
    priority: {
        type: String,

    },
    status: {
        type: String,
        enum: ['new', 'todo', 'in-progress', 'completed'],

    },
    files: [
        {
            filename: {
                type: String
            },
            path: {
                type: String
            },
            type: {
                type: String
            }
        }
    ],
    created_at: {
        type: Date,
        default: Date.now()
    },
    Comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
})
module.exports = mongoose.model("Project", projectSchema)