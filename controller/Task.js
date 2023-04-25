const Task = require("../models/Task")
const Project = require("../models/projects")

module.exports = {

    /////////// add projects ///////////////
    async addTask(req, res, next) {
        try {
            const newtask = {
                ...req.body,
                user_id: req.user.id,
                project_id: req.params.projectId
            }
            let task = await new Task(newtask)
            task = await task.save()
            try {
                await Project.findByIdAndUpdate(
                    req.params.projectId,
                    { $push: { task_id: newtask._id } }
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

    //////////// get projects /////////////////
    async getTask(req, res, next) {
        try {
            const task = await Task.find()
                .populate("Comment")
                .populate("user_id")
                .populate("user_id")
                .populate("project_id");


            return res.status(200).send({
                success: true,
                message: "Tasks",
                status: 200,
                data: task
            })
        } catch (error) {
            next(error)
        }
    },


    //////////// delete projects /////////////////
    async deleteTask(req, res, next) {
        try {
            const deleteTAsk = Task.findByIdAndDelete(req.params.id)
            try {
                const updateProject = Project.findByIdAndUpdate(
                    req.params.projectid,
                    { $pull: { task_id: req.params.id } }
                )
            }
            catch (error) {
                next(error)
            }
            return res.status(200).send({
                success: true,
                message: "Task deleted",
                status: 200,
                data: deleteTAsk
            })
        }
        catch (error) {
            next(error)
        }
    },

    //////////// update projects /////////////////
    async updateTask(req, res, next) {
        try {
            const updateTask = Task.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            )

            return res.status(200).send({
                success: true,
                message: "Task updated",
                status: 200,
                data: updateTask
            })
        }
        catch (error) {
            next(error)
        }
    }
}