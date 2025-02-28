const express = require("express");
require("dotenv").config();
const { connectMongoClient, watchCollection } = require("./utils/mongoClient");
const verifyASPToken = require("./middleware/varifyASPToken");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
// socket io configuration
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const { join } = require("node:path");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 3000;
const url = process.env.MONGODB_URL;

const coursesRouter = require("./routes/courses.routes");
const usersRouter = require("./routes/users.routes");
const verifyToken = require("./middleware/varifyToken");

app.use(cors());
mongoose.connect(url).then(() => console.log("Connected to MongoDB"));

app.use(express.json());
app.use("/api/courses", verifyToken, coursesRouter);
app.use("/api/users", usersRouter);

app.get("/", verifyToken, (req, res) => {
  res.send("Hello World!");
});
app.get("/api/socket", (req, res) => {
  res.sendFile(join(__dirname, "/views/index.html"));
});

(async () => {
  const client = await connectMongoClient(url);
  watchCollection(client, io);
})();

//start server
server.listen(port, () => console.log("Listening on port " + port));
