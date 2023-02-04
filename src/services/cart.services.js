const { Op, where } = require("sequelize");
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
  static async getCart(id) {
    try {
      const result = await cart.findOne({
        where: { user_id: id },
        // include: { attributes: ["id"] },
      });
      // console.log(result);
      return result;
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
  static async getProducts(cart_id) {
    try {
      const result = await product_in_cart.findAll({
        where: { cart_id },
        include: {
          model: product,
          as: "product",
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
      if (!data) {
        return { isValid: false };
      }
      return { isValid: true, id: data.id, quantity: data.quantity };
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

  static async restoreCart(id) {
    try {
      const result = await cart.update({ total_price: 0 }, { where: { id } });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async destroyProducts(id) {
    try {
      const result = await product_in_cart.destroy({ where: { cart_id: id } });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CartServices;
