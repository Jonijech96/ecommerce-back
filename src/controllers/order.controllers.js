const OrderServices = require("../services/order.services");

const getOrder = async (req, res) => {
  try {
    const { id } = req.user;
    const result = await OrderServices.getAll(id);
    res.json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { getOrder };
