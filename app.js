const express = require("express");
const app = express();

//html views
// app.use(express.static("./views"));

//midleware : a function have access to request and response object
app.use((req, res, next) => {
	console.log("Url:" + req.url + " " + "method:" + req.method);
	next();
});

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
