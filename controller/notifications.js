const Notification = require("../models/notifications");

module.exports = {

    /////////// add Subtask ///////////////
    async addNotifications(req, res, next) {
        try {
            const newNotification = {
                ...req.body,
                Action_userId: req.user.id,
            }
            let notifications = await new Notification(newNotification)
            notifications = await Notification.save()
            return res.status(200).send({
                success: true,
                message: "Notification Added",
                status: 200,
                data: subtask
            })
        }
        catch (error) {
            next(error)
        }
    },

    //////////// get Subtask /////////////////
    async getNotification(req, res, next) {
        try {
            const notifications = await Notification.find()
                .populate("Action_userId")
                .populate("Show_userId")


            return res.status(200).send({
                success: true,
                message: "Subtask",
                status: 200,
                data: subTask
            })
        } catch (error) {
            next(error)
        }
    },


    //////////// delete Subtask /////////////////
    async deleteNotification(req, res, next) {
        try {
            const deleteNotification = Notification.findByIdAndDelete(req.params.id);
            return res.status(200).send({
                success: true,
                message: "notification deleted",
                status: 200,
                data: deleteSubtask
            })
        }
        catch (error) {
            next(error)
        }
    },

}
