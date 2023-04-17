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
    Comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
})
module.exports = mongoose.model("Project", projectSchema)