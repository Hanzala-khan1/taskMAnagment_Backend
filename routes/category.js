const controller = require("../controller/category");
const { verifyToken } = require("../utils/varifyToken");
const Router = require("express").Router();

Router.post("/addcategory", verifyToken, controller.addcategory);
Router.get("/getcategory", verifyToken, controller.getcategory);
Router.delete("/deletecategory/:id", verifyToken, controller.deletecategory);
Router.put("/updatecategory/:id", verifyToken, controller.updatecategory);

module.exports = Router;