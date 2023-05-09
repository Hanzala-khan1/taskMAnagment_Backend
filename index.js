const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connect = require("./connection/connection.js");
// require('./.env').config();
dotenv.config();

/////////// middle ware //////////
app.use(express.json())


//////////// routes /////////////
app.use("/v/user", require("./routes/user.js"));
app.use("/v/project", require("./routes/projects.js"));
app.use("/v/task", require("./routes/Task.js"));
app.use("/v/subtask", require("./routes/Subtask.js"));
app.use("/v/comment", require("./routes/Comment.js"));
app.use("/v/chat", require("./routes/chats.js"));
app.use("/v/message", require("./routes/messages.js"));
app.use("/v/notification", require("./routes/notifications.js"));




/////////// error handiling middleware ///////////
app.use((error, req, res, next) => {
  const message = error.message || "invalid error";
  const status = error.status || 500;
  console.log({ "status": status })
  return res.status(status).json({
    success: false,
    message: message,
    status: status,
    error: error.stack,
  });
});

///////// connection ////////////
const PORT = process.env.PORT || 8000;
const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);
connect();

/////////////////////////////////////////////////////////////////////////////

///////////////// socket connection ///////////////////
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});



//////////// sockets ///////////////////
io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });


  // Listen for incoming messages from the client
  socket.on('Notifications', (message) => {
    console.log(`received Notifications: ${message}`);

    // Broadcast the message to all connected clients
    io.emit('Notifications', message);
  });

  // Listen for disconnections
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
