const CartServices = require("../services/cart.services");
const ProductServices = require("../services/product.services");

const addProductInCart = async (req, res) => {
  try {
    const { quantity, product_id } = req.body;
    if (!quantity || !product_id) {
      return res.status(400).json({ message: "missing required field" });
    }

    const getProduct = await ProductServices.getById(product_id);

    if (!getProduct.isValid) {
      return res.status(400).json({ message: "product no exist" });
    }
    const { price } = getProduct.result;
    const userId = req.user.id;
    // console.log(req.user.id);
    const cart = await CartServices.getCart(userId);
    const { id: cartId } = cart;

    const isValid = await CartServices.isEqual(cartId, product_id);

    if (isValid.isValid) {
      await CartServices.updateQty(isValid.id, isValid.quantity + quantity);
    } else {
      await CartServices.addProduct({
        cart_id: cartId,
        product_id,
        quantity,
        price,
      });
    }

    await CartServices.updateCart(req.user.id, price * quantity);

    res.status(201).json({ message: "product add to cart sucess" });
    // res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getProductsById = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id);
    const cart = await CartServices.getCart(id);
    const { id: idCart } = cart;
    const result = await CartServices.getProducts(idCart);
    res.json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { addProductInCart, getProductsById };
