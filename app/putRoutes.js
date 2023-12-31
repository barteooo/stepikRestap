const express = require("express");
const router = express.Router();

const { MongoClient, ObjectId } = require("mongodb");
const mongoUrl = "mongodb://localhost:27017";
const client = new MongoClient(mongoUrl);

router.put("/products/:id", async (req, res) => {
  const dataBase = await client.db("store").collection("products");
  const id = new ObjectId(req.params.id);
  await dataBase.updateOne(
    {
      _id: id,
    },
    { $set: { ...req.body } }
  );

  res.sendStatus(200);
});

module.exports = router;
