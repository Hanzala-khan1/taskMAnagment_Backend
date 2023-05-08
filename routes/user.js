const controller = require("../controller/user.js");
const Router = require("express").Router();

Router.post("/addUser", controller.addUser);
Router.post("/loginUser", controller.login);
Router.get("/getAll", controller.getAll);
Router.get("/getOne/:id", controller.getOne);
Router.put("/updatePassword/:id", controller.updatePassword);

module.exports = Router;