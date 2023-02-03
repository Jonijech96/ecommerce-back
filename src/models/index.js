const initModels = require("./init-models");

const db = require("../utils/database");

const models = initModels(db);

const { cart, order, product, product_in_cart, product_in_order, users } =
  models;

module.exports = {
  cart,
  order,
  product,
  product_in_cart,
  product_in_order,
  users,
};
