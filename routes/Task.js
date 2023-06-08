const controller = require("../controller/Task");
const { upload } = require("../middleware/multer");
const { verifyToken } = require("../utils/varifyToken");
const Router = require("express").Router();

Router.post("/addTask/:projectId", verifyToken, upload.array("files"), controller.addTask);
Router.get("/getTask", verifyToken, controller.getTask);
Router.delete("/deleteTask/:taskid/:projectid", verifyToken, controller.deleteTask);
Router.put("/updateTask/:taskid", verifyToken, controller.updateTask);
Router.put("/updateTaskstatus/:taskid", verifyToken, controller.updateTaskStatus);

module.exports = Router;