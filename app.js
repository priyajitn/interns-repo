const express = require("express");
const Product = require("./models/productModel");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());


mongoose
  .connect(
    "mongodb+srv://nehalbhuyan:K6k9zRCugJVg1ARU@mycluster.i7h87iq.mongodb.net/firstCollectioin?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Application running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
app.get("/product", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
// asyn required for DB activities why?
app.put("/product/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id,req.body);
    // product not present in db
    if(!product){
        return res.status(404).json({ message: `cannot find product with id: ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.json(updatedProduct); 
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/product/:id", async (req, res) => {
    try {
      const {id} = req.params;
      const product = await Product.findByIdAndDelete(id,req.body);
      // product not present in db
      if(!product){
          return res.status(404).json({ message: `cannot find product with id: ${id}` });
      }
      res.json(updatedProduct); 
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });