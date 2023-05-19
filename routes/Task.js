const controller = require("../controller/Task");
const { upload } = require("../middleware/multer");
const { verifyToken } = require("../utils/varifyToken");
const Router = require("express").Router();

Router.post("/addTask/:projectId", verifyToken, upload.array("file"), controller.addTask);
Router.post("/getTask", verifyToken, controller.getTask);
Router.post("/deleteTask", verifyToken, controller.deleteTask);
Router.post("/updateTask", verifyToken, controller.updateTask);
Router.post("/updateTaskstatus", verifyToken, controller.updateTaskStatus);

module.exports = Router;