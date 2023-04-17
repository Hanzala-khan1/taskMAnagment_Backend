const controller = require("../controller/comment");
const Router = require("express").Router();

Router.post("/addcomment",controller.addcomment);
Router.post("/getcomment",controller.getcomment);
Router.post("/deletecomments",controller.deletecomment);
Router.post("/updatecomments",controller.updatecomment);

module.exports= Router;