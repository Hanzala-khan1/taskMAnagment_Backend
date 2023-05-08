const controller = require("../controller/Subtask");
const { verifyToken } = require("../utils/varifyToken");
const Router = require("express").Router();

Router.post("/addSubtask/:taskId", verifyToken, controller.addSubtask);
Router.post("/getSubtask", controller.getSubtask);
Router.post("/deleteSubtask", controller.deleteSubtask);
Router.post("/updateSubtask", controller.updateSubtask);

module.exports = Router;