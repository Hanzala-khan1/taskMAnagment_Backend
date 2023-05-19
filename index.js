const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
const connect = require("./connection/connection.js");
const bodyParser = require('body-parser');
dotenv.config();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(formidable());
app.options('*', cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(cors());



//////////// routes /////////////
app.use("/v/user", require("./routes/user.js"));
app.use("/v/project", require("./routes/projects.js"));
app.use("/v/task", require("./routes/Task.js"));
app.use("/v/subtask", require("./routes/Subtask.js"));
app.use("/v/comment", require("./routes/Comment.js"));
app.use("/v/chat", require("./routes/chats.js"));
app.use("/v/message", require("./routes/messages.js"));
app.use("/v/notification", require("./routes/notifications.js"));
app.use("/v/category", require("./routes/category.js"));




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

//////////// images path //////////////////////////////
app.use('/profile/images', express.static("./upload/images/"));
app.use('/profile/files', express.static("./upload/files/"));

/////////////////////////////////////////////////////////////////////////////

///////////////// socket connection ///////////////////
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {},
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
