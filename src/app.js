// const transporter = require("./utils/mailer");
const db = require("./utils/database");
const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");
// const authRoutes = require("./routes/auth.routes");
// const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(cors());
// app.morgan("tiny");

// db.authenticate()
//   .then(() => console.log("Base de datos autenticada"))
//   .catch((error) => console.log(error));

// db.sync({ force: true })
//   .then(() => console.log("Base de datos sincronizada"))
//   .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.json({ message: "welcome to my server" });
});

// app.use("/api/v1/auth", authRoutes);
routerApi(app);
// transporter
//   .verify()
//   .then(() => console.log("trasnporter is ok"))
//   .catch((error) => console.log(error));

// const sendMail = async () => {
//   await transporter.sendMail({
//     from: "jonfullventas96@gmail.com",
//     to: "ian.rosas@academlo.com",
//     subject: "prueba de nodemailer",
//     text: "hola nodemailer",
//     html: "<h1>Hola nodemailer</h1>",
//   });
// };

// sendMail();

module.exports = app;
