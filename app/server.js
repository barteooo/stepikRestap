const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const { MongoClient } = require("mongodb");
const mongoUrl = "mongodb://localhost:27017/";
const client = new MongoClient(mongoUrl);

const getRoutes = require("./getRoutes");
const postRoutes = require("./postRoutes");
const putRoutes = require("./putRoutes");
const deleteRoutes = require("./deleteRoutes");
app.use(morgan("dev"));
app.use(express.json());
app.use(getRoutes, postRoutes, putRoutes, deleteRoutes);

client.connect().then(() => {
  app.listen(port, () => {
    console.log("Server is running " + port);
  });
});
