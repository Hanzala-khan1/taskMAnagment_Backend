const controller = require("../controller/notifications");
const { verifyToken } = require("../utils/varifyToken");
const Router = require("express").Router();

Router.post("/add_notification/:userid", verifyToken, controller.addNotifications);
Router.post("/get_notification", verifyToken, controller.getNotification);
Router.post("/delete_notification", verifyToken, controller.deleteNotification);

module.exports = Router;