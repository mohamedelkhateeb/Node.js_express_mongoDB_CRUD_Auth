const express = require("express");
const app = express();
const port = 5000;
const routes = require("./routes/courses.routes");

app.use(express.json());
app.use("/api/courses", routes);

//start server
app.listen(port, () => console.log("Listening on port " + port));
