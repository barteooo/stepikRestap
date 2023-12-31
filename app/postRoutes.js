const express = require("express");
const router = express.Router();

const { MongoClient } = require("mongodb");
const mongoUrl = "mongodb://localhost:27017";
const client = new MongoClient(mongoUrl);

router.post("/products", async (req, res) => {
  const dataBase = await client.db("store").collection("products");
  const { name } = req.body;
  const product = await dataBase.findOne({ name });
  if (product) {
    res.sendStatus(400);
  } else {
    await dataBase.insertOne({ ...req.body });
    res.sendStatus(200);
  }
});

module.exports = router;
