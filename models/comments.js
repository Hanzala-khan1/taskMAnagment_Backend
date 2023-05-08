const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
    },
    comment_of: {
        type: String,
        enum: ['task', 'subtask', 'project'],
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    })
module.exports = mongoose.model("Comment", CommentSchema)