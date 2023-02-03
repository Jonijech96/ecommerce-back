const { Router } = require("express");
const {
  getAllProducts,
  createProduct,
} = require("../controllers/product.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const router = Router();

/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     summary: get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: complete
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/products"
 *     400:
 *       description: Bad request
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: error
 * /api/v1/auth/products:
 *   post:
 *     summary: create a new product
 *     tags: [Products]
 *     requestBody:
 *       description: Required fields to create a new product
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/newproduct"
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: product created
 *       400:
 *         description: create error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: create error
 */

router.get("/", getAllProducts);
router.post("/", createProduct);
// router.post("/login", login);
// router.get("/authenticate", authMiddleware, testAutentificator);

module.exports = router;
