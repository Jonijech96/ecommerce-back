const { Router } = require("express");
const {
  getOrder,
  createOrder,
  statusOrder,
} = require("../controllers/order.controllers");

const authMiddleware = require("../middlewares/auth.middleware");
const router = Router();

/**
 * @openapi
 * /api/v1/order:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: get all order by user
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: complete
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/orders"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: El token no es válido o ya expiro, envía un token correcto
 *       498:
 *         description: token missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No token provider
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: create a new order
 *     tags: [Order]
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
 *                   example: order created
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
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: edit status order by user
 *     tags: [Order]
 *     requestBody:
 *       description: Required fields to edit status order
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/orderstatus"
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

// router.post("/", authMiddleware, addProductInOrder);
router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getOrder);
router.put("/", authMiddleware, statusOrder);

// router.post("/", createProduct);
// router.post("/login", login);
// router.get("/authenticate", authMiddleware, testAutentificator);

module.exports = router;
