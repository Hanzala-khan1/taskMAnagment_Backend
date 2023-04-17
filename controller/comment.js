const Comment = require("../models/comments")

module.exports = {

    /////////// add comment ///////////////
    async addcomment(req, res, next) {
        const comment = await new Comment(req.body)
        await comment.save()
        res.status(200).json(comment)
    },

    //////////// get comment /////////////////
    async getcomment(req, res, next) {
        try {
            const comment = await Comment.find()
            res.status(200).json(comment);
        } catch (error) {
          next(error)
        }
    },


    //////////// delete comment /////////////////
    async deletecomment(req, res, next) {

    },

    //////////// update comment /////////////////
    async updatecomment(req, res, next) {

    }
}