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
        enum: ['new', 'todo', 'in-progress', 'completed'],
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    file_link: {
        type: String,
        maxlength: 1000 // Set the maximum length of the description to 1000 characters
    },
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