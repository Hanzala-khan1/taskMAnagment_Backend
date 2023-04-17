const Subtask = require("../models/Subtask")

module.exports = {

    /////////// add Subtask ///////////////
    async addSubtask(req, res, next) {
        const subtask = await new Subtask(req.body)
        await subtask.save()
        res.status(200).json(subtask)
    },

    //////////// get Subtask /////////////////
    async getSubtask(req, res, next) {
        try {
            const subtask = await Subtask.find()
            res.status(200).json(subtask);
        } catch (error) {
          next(error)
        }
    },


    //////////// delete Subtask /////////////////
    async deleteSubtask(req, res, next) {

    },

    //////////// update Subtask /////////////////
    async updateSubtask(req, res, next) {

    }
}