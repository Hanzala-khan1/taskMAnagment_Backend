const Subtask = require("../models/Subtask");
const Task = require("../models/Task")

module.exports = {

    /////////// add Subtask ///////////////
    async addSubtask(req, res, next) {
        try {
            const newSubtask = {
                ...req.body,
                user_id: req.user.id,
                Task_id: req.params.taskId,
            }
            let Subtask = await new Subtask(newSubtask)
            Subtask = await task.save()
            try {
                await Task.findByIdAndUpdate(
                    req.params.taskId,
                    { $push: { subtask_id: Subtask._id } }
                )
            }
            catch (error) {
                next(error)
            }
            return res.status(200).send({
                success: true,
                message: "Task Added",
                status: 200,
                data: task
            })
        }
        catch (error) {
            next(error)
        }
    },

    //////////// get Subtask /////////////////
    async getSubtask(req, res, next) {
        try {
            const subTask = await Task.find()
                .populate("Comment")
                .populate("user_id")
                .populate("Task_id")


            return res.status(200).send({
                success: true,
                message: "Tasks",
                status: 200,
                data: subTask
            })
        } catch (error) {
            next(error)
        }
    },


    //////////// delete Subtask /////////////////
    async deleteSubtask(req, res, next) {
        try {
            const deleteSubtask = Subtask.findByIdAndDelete(req.params.id)
            try {
                const updateTask = Task.findByIdAndUpdate(
                    req.params.taskId,
                    { $pull: { subtask_id: req.params.id } }
                )
            }
            catch (error) {
                next(error)
            }
            return res.status(200).send({
                success: true,
                message: "SubTask deleted",
                status: 200,
                data: deleteSubtask
            })
        }
        catch (error) {
            next(error)
        }
    },

    //////////// update Subtask /////////////////
    async updateSubtask(req, res, next) {
        try {
            const updateSubTask = Subtask.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            )
            return res.status(200).send({
                success: true,
                message: "SubTask updated",
                status: 200,
                data: updateSubTask
            })

        }
        catch (error) {
            next(error)
        }
    }
}
