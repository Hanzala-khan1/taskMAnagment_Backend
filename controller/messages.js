module.exports = {

    ///////////////////////////////////
    async allMessages(req, res, next) {
        try {
            const messages = await Message.find({ chat: req.params.chatId })
                .populate("sender", "name pic email")
                .populate("chat");
            return res.status(200).send({
                success: true,
                message: "All Messages",
                status: 200,
                data: messages
            })
        } catch (error) {
            next(error)
        }
    },


    /////////////////////////////////////
    async sendMessage(req, res) {
        const { content, chatId } = req.body;

        if (!content || !chatId) {
            console.log("Invalid data passed into request");
            return res.sendStatus(400);
        }

        var newMessage = {
            sender: req.user._id,
            content: content,
            chat: chatId,
        };

        try {
            var message = await Message.create(newMessage);

            message = await message.populate("sender", "name pic");
            message = await message.populate("chat");
            message = await User.populate(message, {
                path: "chat.users",
                select: "name pic email",
            });

            await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

            return res.status(200).send({
                success: true,
                message: "All Messages",
                status: 200,
                data: message
            })
        } catch (error) {
            next(error)
        }
    }
}