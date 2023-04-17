const controller = require("../controller/projects");
const Router = require("express").Router();

Router.post("/addproject/:userid",controller.addProjects);
Router.post("/getproject",controller.getProjects);
Router.post("/deleteprojects",controller.deleteProjects);
Router.post("/updateprojects",controller.updateProjects);

module.exports= Router;