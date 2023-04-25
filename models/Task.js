const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subtask_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subtask'
    }],
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
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
        type: String,
        required: true,
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
module.exports = mongoose.model("Task", taskSchema)