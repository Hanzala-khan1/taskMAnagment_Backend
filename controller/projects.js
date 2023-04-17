const Projects = require("../models/projects")

module.exports = {

    /////////// add projects ///////////////
    async addProjects(req, res, next) {
        const project = await new Projects({
            ...req.body,
            user_id: req.params.userid
        })
        await project.save()
        res.status(200).json(project)
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
            res.status(200).json(project);
        } catch (error) {
          next(error)
        }
    },


    //////////// delete projects /////////////////
    async deleteProjects(req, res, next) {

    },

    //////////// update projects /////////////////
    async updateProjects(req, res, next) {

    }
}