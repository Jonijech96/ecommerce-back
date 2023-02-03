const { order } = require("../models");

class OrderServices {
  static async create(newOrder) {
    try {
      const result = await order.create(newOrder);
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
}

module.exports = OrderServices;
