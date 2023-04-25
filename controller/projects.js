const Projects = require("../models/projects")

module.exports = {

    /////////// add projects ///////////////
    async addProjects(req, res, next) {
        try {
            const project = await new Projects({
                ...req.body,
                user_id: req.user.id
            })
            await project.save()
            return res.status(200).send({
                success: true,
                message: "project Added secussfully",
                status: 200,
                data: project
            })
        }
        catch (error) {
            next(error)
        }
    },

    //////////// get projects /////////////////
    async getProjects(req, res, next) {
        try {
            const project = await Projects.find()
                .populate("Comment")
                .populate("user_id")
                .populate({
                    path: "task_id",
                    populate: {
                        path: "subtask",
                    },
                });
            return res.status(200).send({
                success: true,
                message: "ALL projects",
                status: 200,
                data: project
            })
        } catch (error) {
            next(error)
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