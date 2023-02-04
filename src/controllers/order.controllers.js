const CartServices = require("../services/cart.services");
const OrderServices = require("../services/order.services");
const ProductServices = require("../services/product.services");

const getOrder = async (req, res) => {
  try {
    const { id } = req.user;
    const result = await OrderServices.getAll(id);
    res.json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const createOrder = async (req, res) => {
  try {
    const idUser = req.user;
    const order = await OrderServices.create(idUser);
    const { id: idOrder } = order;
    const cart = await CartServices.getCart(idUser.id);
    const { id: idCart, total_price } = cart;
    const products = await CartServices.getProducts(idCart);
    products.forEach(async (product) => {
      await OrderServices.addProduct({
        order_id: idOrder,
        product_id: product.product_id,
        quantity: product.quantity,
        price: product.price,
      });
    });
    await OrderServices.updateOrder(idOrder, total_price);
    await CartServices.restoreCart(idCart);
    await CartServices.destroyProducts(idCart);

    res.json({ message: "orden de compra generada exitosamente" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const statusOrder = async (req, res) => {
  try {
    const { id, status } = req.body;
    if (!id || !status) {
      return res.status(400).json({ message: "missing required field" });
    }
    const result = await OrderServices.updateStatus(id, status);

    if (status) {
      const products = await OrderServices.getProducts(id);

      products.forEach(async (product) => {
        await ProductServices.update(product.id, product.quantity);
      });
      return res.status(201).json({ message: "compra exitosa" });
    }
    res.json({ message: "order cancelled" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { getOrder, createOrder, statusOrder };
