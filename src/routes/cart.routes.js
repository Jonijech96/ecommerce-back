const { Router } = require("express");
const {
  addProductInCart,
  getProductsById,
} = require("../controllers/cart.controllers");

const authMiddleware = require("../middlewares/auth.middleware");
const router = Router();

router.post("/", authMiddleware, addProductInCart);
router.get("/", authMiddleware, getProductsById);
// router.post("/", createProduct);
// router.post("/login", login);
// router.get("/authenticate", authMiddleware, testAutentificator);

module.exports = router;
