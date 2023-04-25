const Chat = require("../models/chats");
const User = require("../models/user");



module.exports = {
    async accessChat(req, res) {
        const { userId } = req.body;

        if (!userId) {
            console.log("UserId param not sent with request");
            return res.sendStatus(400);
        }

        var isChat = await Chat.find({
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        })
            .populate("users", "-password")
            .populate("latestMessage");

        if (isChat.length > 0) {
            const otherUser = isChat[0].users.find((user) => !user._id.equals(req.user._id));
            const otherUserName = otherUser ? otherUser.name : "Unknown User";
            const chatData = {
                ...isChat[0]._doc,
                chatName: otherUserName,
            };
            return res.status(200).send({
                success: true,
                message: "chat detail",
                status: 200,
                data: chatData
            })
        } else {
            const chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId],
            };

            try {
                const createdChat = await Chat.create(chatData);
                const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                    "users",
                    "-password"
                );
                // Get the other user's name
                const otherUser = FullChat.users.find((user) => !user._id.equals(req.user._id));
                const otherUserName = otherUser ? otherUser.name : "Unknown User";

                // Add the other user's name to the chat data
                const DataList = {
                    ...FullChat._doc,
                    chatName: otherUserName,
                };
                return res.status(200).send({
                    success: true,
                    message: "chat detail",
                    status: 200,
                    data: DataList
                })
            } catch (error) {
                next(error)
            }
        }
    },
    async fetchChats(req, res, next) {
        try {
            Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
                .populate("users", "-password")
                .populate("latestMessage")
                .sort({ updatedAt: -1 })
                .then(async (results) => {
                    results = results.map((chat) => {
                        const otherUser = chat.users.find((user) => user._id.toString() !== req.user._id.toString());
                        chat.chatName = otherUser.name;
                        return chat;
                    });

                    return res.status(200).send({
                        success: true,
                        message: "List of all chats",
                        status: 200,
                        data: results
                    })
                });
        } catch (error) {
            next(error)
        }
    }
}