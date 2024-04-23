const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = 5000;
const url =
	"mongodb+srv://mokhateeb74:h0VVKbJTcPf6Ii4E@cluster0.rzujb9b.mongodb.net/TasksDB?retryWrites=true&w=majority&appName=Cluster0";
const routes = require("./routes/courses.routes");

mongoose.connect(url).then(() => console.log("Connected to MongoDB"));

app.use(express.json());
app.use("/api/courses", routes);

//start server
app.listen(port, () => console.log("Listening on port " + port));
