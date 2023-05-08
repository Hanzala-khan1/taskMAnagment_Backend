const controller = require("../controller/Task");
const { verifyToken } = require("../utils/varifyToken");
const Router = require("express").Router();

Router.post("/addTask/:projectId", verifyToken, controller.addTask);
Router.post("/getTask", verifyToken, controller.getTask);
Router.post("/deleteTask", verifyToken, controller.deleteTask);
Router.post("/updateTask", verifyToken, controller.updateTask);

module.exports = Router;