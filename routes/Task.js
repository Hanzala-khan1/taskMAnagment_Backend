const controller = require("../controller/Task");
const Router = require("express").Router();

Router.post("/addTask",controller.addTask);
Router.post("/getTask",controller.getTask);
Router.post("/deleteTask",controller.deleteTask);
Router.post("/updateTask",controller.updateTask);

module.exports= Router;