const controller = require("../controller/projects");
const { upload } = require("../middleware/multer");
const { verifyToken } = require("../utils/varifyToken");
const Router = require("express").Router();

Router.post("/addproject", verifyToken, upload.array("file"), controller.addProjects);
Router.get("/getproject", verifyToken, controller.getProjects);
Router.post("/deleteproject", verifyToken, controller.deleteProjects);
Router.post("/updateproject", verifyToken, controller.updateProjects);
Router.post("/updateprojectStatus", verifyToken, controller.updateProjectStatus);

module.exports = Router;