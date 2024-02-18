require("dotenv").config();
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const Product = require("./models/products");

const ProductJson = require("./products.json");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB Connected Successfully!"))
    .catch((error) => {
      console.log(error);
    });
};

const start = async () => {
  try {
    await connectDB();
    await Product.create(ProductJson);
    console.log("Data uploaded Succesfully!");
  } catch (error) {
    console.log(error);
  }
};

start();
