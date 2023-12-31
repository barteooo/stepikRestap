const express = require("express");
const router = express.Router();

const { MongoClient, ObjectId } = require("mongodb");
const mongoUrl = "mongodb://localhost:27017";
const client = new MongoClient(mongoUrl);

router.delete("/products/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);
  const dataBase = await client.db("store").collection("products");
  await dataBase.deleteOne({ _id: id });
  res.sendStatus(200);
});

module.exports = router;
