const { product, users } = require("../models");
const { Op } = require("sequelize");

class ProductServices {
  static async getAll() {
    try {
      const result = await product.findAll({
        where: {
          available_qty: {
            [Op.gt]: 0,
          },
        },
        include: {
          model: users,
          as: "user",
          attributes: ["username"],
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async create(newProduct) {
    try {
      const result = await product.create(newProduct);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const result = await product.findByPk(id);
      if (result) {
        return { isValid: true, result };
      }
      return { isValid: false };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductServices;
