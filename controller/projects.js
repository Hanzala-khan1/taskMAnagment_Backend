const { APP_host } = require("../middleware/dataconfig");
const Projects = require("../models/projects")
const { createError } = require("../utils/error");

module.exports = {

    /////////// add projects ///////////////
    async addProjects(req, res, next) {
        try {
            const { status, description, title, priority, category } = req.body;
            const files = req.files.map(file => ({
                filename: file.originalname,
                path: `${APP_host}profile/${file.mimetype.startsWith('image') ? 'images' : 'files'}/${file.filename}`,
                type: file.mimetype.split('/')[0],
            }));

            const project = new Projects({
                status,
                description,
                title,
                priority,
                files,
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
                .populate('user_id')
                .populate({
                    path: 'task_id',
                    populate: {
                        path: 'subtask_id',
                    },
                })
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
        const id = req.params.id
        try {
            const project = await Projects.findByIdAndDelete(id)
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
    async updateProjects(req, res, next) {
        const id = req.params.id
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
        const id = req.params.id
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