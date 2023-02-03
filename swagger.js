const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
require("dotenv").config();

const options = {
  apis: [
    "./src/routes/auth.routes.js",
    "./src/models/users.js",
    "./src/routes/product.routes.js",
    "./src/models/product.js",
  ],
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ecommerce en node js ",
      version: "0.0.9",
      description: "API para aplicacion de ecommerce",
    },
  },
};

//vamos a crear una especificacion en json para nuestreo docu

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  //generar ruta donde se mostrara la documentacion
  app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader({ "Content-Type": "application/json" });
    res.send(swaggerSpec);
  });

  console.log(
    `La documentacion esta disponible en ${process.env.URL}:${port}/api/v1/docs`
  );
};

module.exports = swaggerDocs;
