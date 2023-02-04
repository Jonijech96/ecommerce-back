const { order, product_in_order } = require("../models");

class OrderServices {
  static async create(newOrder) {
    try {
      console.log(newOrder);
      const result = await order.create({ user_id: newOrder.id });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getAll(id) {
    try {
      const result = await order.findAll({ where: { user_id: id } });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getProducts(idOrder) {
    try {
      const result = await product_in_order.findAll({
        where: { order_id: idOrder },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async addProduct(field) {
    try {
      const result = await product_in_order.create(field);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async updateOrder(id, field) {
    try {
      const result = await order.update(
        { total_price: field },
        { where: { id } }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async updateStatus(id, status) {
    try {
      const result = await order.update({ status }, { where: { id } });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OrderServices;
