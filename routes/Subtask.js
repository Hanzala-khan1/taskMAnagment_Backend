const controller = require("../controller/Subtask");
const Router = require("express").Router();

Router.post("/addSubtask",controller.addSubtask);
Router.post("/getSubtask",controller.getSubtask);
Router.post("/deleteSubtask",controller.deleteSubtask);
Router.post("/updateSubtask",controller.updateSubtask);

module.exports= Router;