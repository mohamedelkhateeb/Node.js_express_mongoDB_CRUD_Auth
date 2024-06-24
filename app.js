const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
const url = process.env.MONGODB_URL;
console.log({ url });
const coursesRouter = require("./routes/courses.routes");
const usersRouter = require("./routes/users.routes");
app.use(cors());
mongoose.connect(url).then(() => console.log("Connected to MongoDB"));

app.use(express.json());
app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

//start server
app.listen(port, () => console.log("Listening on port " + port));
