const { Op } = require("sequelize");
const { cart, product_in_cart, product } = require("../models");

class CartServices {
  static async create(id) {
    try {
      const result = await cart.create({ user_id: id });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getId(id) {
    try {
      const result = await cart.findOne({
        where: { user_id: id },
        // include: { attributes: ["id"] },
      });
      // console.log(result);
      return result.id;
    } catch (error) {
      throw error;
    }
  }
  static async addProduct(product) {
    try {
      const result = await product_in_cart.create(product);
    } catch (error) {
      throw error;
    }
  }
  static async updateCart(userId, field) {
    try {
      const data = await cart.findOne({ where: { user_id: userId } });
      const { total_price } = data;
      const newTotal = total_price + field;
      const result = await cart.update(
        { total_price: newTotal },
        { where: { id: data.id } }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getProducts(user_id) {
    try {
      const result = await cart.findAll({
        where: { user_id },
        include: {
          model: product_in_cart,
          as: "product_in_carts",
          include: {
            model: product,
            as: "product",
          },
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async isEqual(idCart, idProduct) {
    try {
      const data = await product_in_cart.findOne({
        where: {
          [Op.and]: [{ cart_id: idCart }, { product_id: idProduct }],
        },
      });
      return data.id
        ? { isValid: true, id: data.id, quantity: data.quantity }
        : { isValid: false };
    } catch (error) {
      throw error;
    }
  }

  static async updateQty(id, field) {
    try {
      const data = await product_in_cart.update(
        { quantity: field },
        { where: { id } }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CartServices;
