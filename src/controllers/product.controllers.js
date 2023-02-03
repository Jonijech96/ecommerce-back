const ProductServices = require("../services/product.services");

const getAllProducts = async (req, res) => {
  try {
    const result = await ProductServices.getAll();
    res.json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const result = await ProductServices.create(newProduct);
    if (result) {
      res.status(201).json({ message: "product created" });
    } else {
      res.status(400).json({ message: "somethign wrong" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { getAllProducts, createProduct };
