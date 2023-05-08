const controller = require("../controller/messages");
const Router = require("express").Router();

Router.post("/AllMessages", controller.allMessages);
Router.post("/SendMessage", controller.sendMessage);


module.exports = Router;