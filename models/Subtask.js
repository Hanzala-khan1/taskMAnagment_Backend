const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        // required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['new', 'todo', 'pending', 'completed'],
        required: true
    },
    Due_date: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    Due_date: {
        type: String,
        required: true
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
module.exports = mongoose.model("Subtask", subtaskSchema)