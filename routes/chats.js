const controller = require("../controller/chats");
const Router = require("express").Router();

Router.post("/AcessChat", controller.accessChat);
Router.post("/AllChats", controller.fetchChats);


module.exports = Router;