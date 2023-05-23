const controller = require("../controller/Subtask");
const { upload } = require("../middleware/multer");
const { verifyToken } = require("../utils/varifyToken");
const Router = require("express").Router();

Router.post("/addSubtask/:taskId", verifyToken, upload.array("file"), controller.addSubtask);
Router.get("/getSubtask", controller.getSubtask);
Router.delete("/deleteSubtask/:subtaskid", controller.deleteSubtask);
Router.put("/updateSubtask/:subtaskid", controller.updateSubtask);
Router.put("/updateSubtaskStatus/:subtaskid", controller.updateSubtaskStatus);

module.exports = Router;