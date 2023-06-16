const { APP_host } = require("../middleware/dataconfig");
const Projects = require("../models/projects")
const Task = require("../models/Task")
const Subtask = require("../models/Subtask")
const { createError } = require("../utils/error");

module.exports = {

    /////////// add projects ///////////////
    async addProjects(req, res, next) {
        try {
            const { status, description, title, priority, category, Due_date } = req.body;
            let files = []
            if (req.files) {
                files = req.files.map(file => ({
                    filename: file.originalname,
                    path: `${APP_host}profile/${file.mimetype.startsWith('image') ? 'images' : 'files'}/${file.filename}`,
                    type: file.mimetype.split('/')[0],
                }));
            }

            const project = new Projects({
                status,
                description,
                title,
                priority,
                files,
                Due_date,
                category,
                user_id: req.user.id,
            });

            await project.save();

            return res.status(200).send({
                success: true,
                message: 'Project added successfully',
                status: 200,
                data: project,
            });
        } catch (error) {
            next(error);
        }
    },


    //////////// get projects /////////////////
    async getProjects(req, res, next) {
        try {
            const { status, userId } = req.query;

            // Create the query object based on the provided parameters
            const query = {};
            if (status) {
                query.status = status.toLowerCase();
            }
            if (userId) {
                query.user_id = userId;
            }

            // Fetch the projects based on the query
            const projects = await Projects.find(query)
                .populate('Comments')
                .populate("user_id", "_id name image ")
                .populate("task_id")
                .populate("category")
                .sort({ date: -1 });


            res.status(200).send({
                success: true,
                message: 'Projects retrieved successfully',
                data: projects,
            });
        } catch (error) {
            next(error);
        }
    },



    //////////// delete projects /////////////////
    async deleteProjects(req, res, next) {
        const projectId = req.params.projectid;
        try {
            // Check if the project exists
            const project = await Projects.findById(projectId);
            if (!project) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found",
                    status: 404,
                });
            }

            // Delete the project
            const deletedProject = await Projects.findByIdAndDelete(projectId);

            // Find tasks associated with the project and delete subtasks in parallel
            const tasks = await Task.find({ project_id: projectId }).lean().select('_id');
            const deleteTasksPromise = Task.deleteMany({ project_id: projectId }).exec();
            const deleteSubtasksPromise = Subtask.deleteMany({ Task_id: { $in: tasks } }).exec();

            await Promise.all([deleteTasksPromise, deleteSubtasksPromise]);

            return res.status(200).json({
                success: true,
                message: "Project and associated tasks/subtasks deleted",
                status: 200,
                data: deletedProject,
            });
        } catch (error) {
            next(error);
        }
    },

    //////////// update projects /////////////////
    async updateProjects(req, res, next) {
        const id = req.params.projectid
        try {
            const project = await Projects.findByIdAndUpdate(
                id,
                { $set: req.body },
                { new: true }
            )
            return res.status(200).send({
                success: true,
                message: "project updated",
                status: 200,
                data: project
            })

        } catch (error) {
            next(error)
        }
    },
    //////////// update projects /////////////////
    async updateProjectStatus(req, res, next) {
        const id = req.params.projectid
        try {
            const project = await Projects.findByIdAndUpdate(
                id,
                { "status": req.body.status },
                { new: true }
            )
            return res.status(200).send({
                success: true,
                message: "project updated",
                status: 200,
                data: project
            })

        } catch (error) {
            next(error)
        }
    }
}