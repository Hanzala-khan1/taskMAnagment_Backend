const controller = require("../controller/projects");
const { verifyToken } = require("../utils/varifyToken");
const Router = require("express").Router();

Router.post("/addproject/:userid", verifyToken, controller.addProjects);
Router.post("/getproject", verifyToken, controller.getProjects);
Router.post("/deleteproject", verifyToken, controller.deleteProjects);
Router.post("/updateproject", verifyToken, controller.updateProjects);
Router.post("/updateprojectStatus", verifyToken, controller.updateProjectStatus);

module.exports = Router;