const express = require("express");
const app = express();
const dotenv =require( "dotenv");
const connect = require("./connection/connection.js");
// require('./.env').config();
dotenv.config();

/////////// middle ware //////////
app.use(express.json())


//////////// routes /////////////
app.use("/v/user",require("./routes/user.js"));
app.use("/v/project",require("./routes/projects.js"));
app.use("/v/task",require("./routes/Task.js"));
app.use("/v/subtask",require("./routes/Subtask.js"));
app.use("/v/comment",require("./routes/Comment.js"));




/////////// error handiling middleware ///////////
app.use((error,req, res, next) => {
  const message = error.message || "invalid error";
  const status = error.status || 500;
  console.log({"status":status})
  return res.status(status).json({
    success: false,
    message: message,
    status: status,
    error: error.slack,
  });
});

///////// connection ////////////
const PORT = process.env.PORT || 8000;
(async () => {
  try {
    const db = await connect();
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}.`);
    });
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error}`);
  }
})();
