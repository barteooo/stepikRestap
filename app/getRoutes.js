const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const mongoUrl = "mongodb://localhost:27017";
const client = new MongoClient(mongoUrl);

router.get("/products", async (req, res) => {
  const { name, gtePrice, ltAmount, amountSort, priceSort } = req.query;
  let findObj = {};
  let sortObj = {};

  //   part related to filter
  if (name) {
    findObj = { ...findObj, name };
  }
  if (gtePrice) {
    findObj = { ...findObj, price: { $gte: parseFloat(gtePrice) } };
  }
  if (ltAmount) {
    findObj = { ...findObj, amount: { $lte: parseInt(ltAmount) } };
  }

  //   part related to sorting

  if (amountSort) {
    sortObj = { ...sortObj, amount: parseInt(amountSort) };
  }
  if (priceSort) {
    sortObj = { ...sortObj, proce: parseInt(priceSort) };
  }

  const products = await client
    .db("store")
    .collection("products")
    .find({
      ...findObj,
    })
    .sort({ ...sortObj })
    .toArray();

  res.send(products);
});

router.get("/raport", async (req, res) => {
  const dataBase = client.db("store").collection("products");
  const raport = await dataBase
    .aggregate([
      {
        $group: {
          _id: "$name",
          totalAmount: { $sum: "$amount" },
          totalPrice: { $sum: { $multiply: ["$amount", "$price"] } },
        },
      },
    ])
    .toArray();

  res.json(raport);
});

module.exports = router;
