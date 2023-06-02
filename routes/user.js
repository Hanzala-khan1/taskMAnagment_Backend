const controller = require("../controller/user.js");
const { upload } = require("../middleware/multer.js");
const Router = require("express").Router();

Router.post("/addUser", controller.addUser);
Router.post("/loginUser", controller.login);
Router.get("/getAll", controller.getAll);
Router.get("/getOne/:id", controller.getOne);
Router.get("/updateUser/:id", controller.updateUser);
Router.put("/updatePassword/:id", controller.updatePassword);
Router.put("/updateImage/:id", upload.single("file"), controller.updateImage);

module.exports = Router;