const Comment = require("../models/comments")
const Task = require("../models/Task")
const Project = require("../models/projects")
const Subtask = require("../models/Subtask");


module.exports = {

    /////////// add comment ///////////////
    async addcomment(req, res, next) {
        try {
            const { title, description, comment_of } = req.body;
            const { task_id, project_id, subtask_id } = req.query
            const comment = await Comment.create({
                ...req.body,
                user_id: req.user.id
            });


            try {
                if (comment_of === "task") {
                    await Task.findByIdAndUpdate(
                        task_id,
                        { $push: { Comments: comment._id } }
                    )
                }
                if (comment_of === "subtask") {
                    await Subtask.findByIdAndUpdate(
                        subtask_id,
                        { $push: { Comments: comment._id } }
                    )
                }
                if (comment_of === "project") {
                    await Project.findByIdAndUpdate(
                        project_id,
                        { $push: { Comments: comment._id } }
                    )
                }
                return res.status(200).send({
                    success: true,
                    message: "Comment Added",
                    status: 200,
                    data: comment
                })
            } catch (error) {
                next(error)
            }

        } catch (error) {
            next(error)
        }
    },
    /////////// add comment Reply ///////////////
    async addcommentReply(req, res, next) {
        try {

            const commentId = req.params.commentId; // Replace with the actual comment ID

            // Find the comment
            const comment = await Comment.findById(commentId);

            // Create a new reply
            const newReply = {
                comment: req.body.comment,
                user_id: req.user.id
            };

            // Add the new reply to the comment
            comment.replies.push(newReply);

            // Save the updated comment
            const savedcomment = await comment.save();
            return res.status(200).send({
                success: true,
                message: "Comment Reply Added",
                status: 200,
                data: savedcomment
            })

        } catch (error) {
            next(error)
        }
    },

    //////////// get comment /////////////////
    async getcomment(req, res, next) {
        try {
            const comment = await Comment.find()
            return res.status(200).send({
                success: true,
                message: "Comment Reply Added",
                status: 200,
                data: comment
            })
        } catch (error) {
            next(error)
        }
    },


    //////////// delete comment /////////////////
    async deletecomment(req, res, next) {
        commentid = request.params.id
        try {
            const comment = await Comment.findByIdAndDelete(commentid)
            return res.status(200).send({
                success: true,
                message: "Comment Reply Added",
                status: 200,
                data: comment
            })
        }
        catch (error) {
            next(error)
        }
    },

    //////////// update comment /////////////////
    async updatecomment(req, res, next) {
        commentid = request.params.id
        try {
            const comment = await Comment.findByIdAndDelete(
                commentid,
                { $set: req.body },
                { new: true }
            );
        }
        catch (error) {
            next(error)
        }
    }
}