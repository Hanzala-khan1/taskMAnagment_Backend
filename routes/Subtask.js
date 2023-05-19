const controller = require("../controller/Subtask");
const { upload } = require("../middleware/multer");
const { verifyToken } = require("../utils/varifyToken");
const Router = require("express").Router();

Router.post("/addSubtask/:taskId", verifyToken, upload.array("file"), controller.addSubtask);
Router.get("/getSubtask", controller.getSubtask);
Router.post("/deleteSubtask", controller.deleteSubtask);
Router.post("/updateSubtask", controller.updateSubtask);
Router.post("/updateSubtaskStatus", controller.updateSubtaskStatus);

module.exports = Router;