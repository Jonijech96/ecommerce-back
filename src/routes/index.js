const authRoutes = require("./auth.routes");
const productRoutes = require("./product.routes");
const cartRouter = require("./cart.routes");
const orderRouter = require("./order.routes");

const routerApi = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/products", productRoutes);
  app.use("/api/v1/cart", cartRouter);
  app.use("/api/v1/order", orderRouter);
};

module.exports = routerApi;
