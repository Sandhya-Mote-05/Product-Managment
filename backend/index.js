

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
});

const Product = mongoose.model("Product", productSchema);

// get method to fetch all products
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// post method to add new product
app.post("/api/products", async (req, res) => {
  const { name, description, price, quantity } = req.body;

  const product = new Product({
    name,
    description,
    price,
    quantity,
  });

  await product.save();

  res.json({ message: "Product added successfully", product });
});

// Mongodb connect
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
