const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    task_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],
    title: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true

    },
    priority: {
        type: String,
        required: true

    },
    Due_date: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "Project"
    },
    status: {
        type: String,
        enum: ['new', 'todo', 'pending', 'completed', 'pendingclientreview', 'pendingthirdpartyaction', 'revision', 'readyforreview'],
        required: true

    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
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

module.exports = mongoose.model("Project", projectSchema)