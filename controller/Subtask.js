const { APP_host } = require("../middleware/dataconfig");
const Subtask = require("../models/Subtask");
const Task = require("../models/Task")

module.exports = {

    /////////// add Subtask ///////////////
    async addSubtask(req, res, next) {
        try {
            const { status, description, title, priority, category, Due_date } = req.body;
            const files = req.files.map(file => ({
                filename: file.originalname,
                path: `${APP_host}profile/${file.mimetype.startsWith('image') ? 'images' : 'files'}/${file.filename}`,
                type: file.mimetype.split('/')[0],
            }));
            const newSubtask = {
                status,
                description,
                title,
                priority,
                category,
                Due_date,
                files,
                user_id: req.user.id,
                Task_id: req.params.taskId,
            }
            let subtask = await new Subtask(newSubtask)
            subtask = await subtask.save()
            try {
                await Task.findByIdAndUpdate(
                    req.params.taskId,
                    { $push: { subtask_id: subtask._id } }
                )
            }
            catch (error) {
                next(error)
            }
            return res.status(200).send({
                success: true,
                message: "Subtask added successfully",
                status: 200,
                data: subtask
            })
        }
        catch (error) {
            next(error)
        }
    },

    //////////// get Subtask /////////////////
    async getSubtask(req, res, next) {
        const { status, userId, projectId } = req.query;

        // Create the query object based on the provided parameters
        const query = {};
        if (status) {
            query.status = status;
        }
        if (userId) {
            query.user_id = userId;
        }
        if (projectId) {
            query.projectId = projectId;
        }
        try {
            const subTask = await Subtask.find(query)
                .populate("Comments")
                .populate("user_id")
                .populate("category")
                .populate({
                    path: 'Task_id',
                    populate: {
                        path: 'project_id',
                    },
                })
                .sort({ date: -1 });


            return res.status(200).send({
                success: true,
                message: "Subtask",
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
            const deleteSubtask = Subtask.findByIdAndDelete(req.params.subtaskid)
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
                req.params.subtaskid,
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
    },
    //////////// update Subtask status /////////////////
    async updateSubtaskStatus(req, res, next) {
        const id = req.params.subtaskid
        try {
            const updateSubTask = Subtask.findByIdAndUpdate(
                id,
                { status: req.body.status },
                { new: true }
            )
            return res.status(200).send({
                success: true,
                message: "project updated",
                status: 200,
                data: updateSubTask
            })

        } catch (error) {
            next(error)
        }
    }
}
