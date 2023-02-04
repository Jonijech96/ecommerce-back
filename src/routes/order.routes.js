const { Router } = require("express");
const {
  getOrder,
  createOrder,
  statusOrder,
} = require("../controllers/order.controllers");
// const {
//   addProductInCart,
//   getProductsById,
// } = require("../controllers/cart.controllers");

const authMiddleware = require("../middlewares/auth.middleware");
const router = Router();

// router.post("/", authMiddleware, addProductInOrder);
router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getOrder);
router.put("/", authMiddleware, statusOrder);

// router.post("/", createProduct);
// router.post("/login", login);
// router.get("/authenticate", authMiddleware, testAutentificator);

module.exports = router;
