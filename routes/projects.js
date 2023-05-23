const controller = require("../controller/projects");
const { upload } = require("../middleware/multer");
const { verifyToken } = require("../utils/varifyToken");
const Router = require("express").Router();

Router.post("/addproject", verifyToken, upload.array("file"), controller.addProjects);
Router.get("/getproject", verifyToken, controller.getProjects);
Router.delete("/deleteproject/:projectid", verifyToken, controller.deleteProjects);
Router.put("/updateproject/:projectid", verifyToken, controller.updateProjects);
Router.put("/updateprojectStatus/:projectid", verifyToken, controller.updateProjectStatus);

module.exports = Router;