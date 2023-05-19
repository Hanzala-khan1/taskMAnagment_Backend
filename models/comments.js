const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment_of: {
        type: String,
        enum: ['task', 'subtask', 'project'],
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    replies: [{
        comment: {
            type: String,
            required: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
    }]
},
    {
        timestamps: true
    })
module.exports = mongoose.model("Comment", CommentSchema)