const controller = require("../controller/comment");
const { verifyToken } = require("../utils/varifyToken");
const Router = require("express").Router();

Router.post("/addcomment", verifyToken, controller.addcomment);
Router.post("/getcomment", verifyToken, controller.getcomment);
Router.post("/deletecomments", verifyToken, controller.deletecomment);
Router.post("/updatecomments", verifyToken, controller.updatecomment);

module.exports = Router;