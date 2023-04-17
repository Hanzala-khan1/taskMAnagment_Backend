const Task = require("../models/Task")

module.exports = {

    /////////// add projects ///////////////
    async addTask(req, res, next) {
        const task = await new Task({
            ...req.body,
            user_id: req.params.userid
        })
        await task.save()
        res.status(200).json(task)
    },

    //////////// get projects /////////////////
    async getTask(req, res, next) {
        try {
            const task = await Task.find()
            res.status(200).json(task);
        } catch (error) {
          next(error)
        }
    },


    //////////// delete projects /////////////////
    async deleteTask(req, res, next) {

    },

    //////////// update projects /////////////////
    async updateTask(req, res, next) {

    }
}