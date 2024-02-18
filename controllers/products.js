const Products = require("../models/products");

const getAllProducts = async (req, res) => {
  console.log(req.query);
  console.log(req.query.name);

  const { name, sort, select } = req.query;

  if (name) {
    req.query = { name: { $regex: req.query.name, $options: "i" } };
  }

  const myData = await Products.find(req.query);
  // res.status(200).json({ msg: "All products dislayed here" });
  res.status(200).json({ myData });
};

module.exports = { getAllProducts };
