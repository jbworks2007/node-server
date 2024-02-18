const express = require("express");
const mongoose = require("mongoose");
const auth_routes = require("./routes/auth");
const products_routes = require("./routes/products");

require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Respond from server");
});

// middleware or set routes
app.use("/api/auth", auth_routes);
app.use("/api/products", products_routes);

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
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    });
    await connectDB();
  } catch (error) {
    console.log(error);
  }
};

start();

//1CIaeYGrhMYNJemi
