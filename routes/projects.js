const controller = require("../controller/projects");
const { varifyToken } = require("../utils/varifyToken");
const Router = require("express").Router();

Router.post("/addproject/:userid",varifyToken,controller.addProjects);
Router.post("/getproject",varifyToken,controller.getProjects);
Router.post("/deleteproject",varifyToken,controller.deleteProjects);
Router.post("/updateproject",varifyToken,controller.updateProjects);
Router.post("/updateprojectStatus",varifyToken,controller.updateProjectStatus);

module.exports= Router;