const { MongoClient } = require("mongodb");

const connectMongoClient = async (url) => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log("MongoDB Client Connected");
    return client;
  } catch (error) {
    console.error("MongoDB Client Connection Error:", error);
    process.exit(1);
  }
};

const watchCollection = async (client, io) => {
  const database = client.db("todo");
  const collection = database.collection("Todo");

  const initialData = await collection.find({}).toArray();
  console.log({ initialData });
  io.on("connection", (socket) => {
    io.emit("initialData", initialData);
  });

  const changeStream = collection.watch();

  changeStream.on("change", (next) => {
    switch (next.operationType) {
      case "insert":
        io.emit("message", next.fullDocument);
        console.log(next.fullDocument);
        break;
      case "update":
        io.emit("message", next.updateDescription.updatedFields);
        console.log(next.updateDescription.updatedFields);
        break;
    }
  });
};

module.exports = { connectMongoClient, watchCollection };
