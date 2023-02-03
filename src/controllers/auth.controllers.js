const AuthServices = require("../services/auth.services");
const CartServices = require("../services/cart.services");
const transporter = require("../utils/mailer");

const register = async (req, res) => {
  try {
    const user = req.body;
    const result = await AuthServices.register(user);
    if (result) {
      const { id } = result;
      console.log(id);
      await CartServices.create(id);
      res.status(201).json({ message: "user created" });
      await transporter.sendMail({
        to: result.email,
        from: "jonfullventas96@gmail.com",
        subject: "email confirmation",
        html: "<h1>bienvenido al mejor ecommerce</h1><p>si tienes dudas de que sea entra a <a href='#'' target='new_blanc'> enlace </a></p>",
      });
    } else {
      res.status(400).json({ message: "somethign wrong" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        error: "Missing data",
        message: "Not email provided",
      });
    }
    if (!password) {
      return res.status(400).json({
        error: "Missing data",
        message: "Not password provided",
      });
    }

    const result = await AuthServices.login({ email, password });
    //field || credentials
    if (result.isValid) {
      const { username, id, email } = result.user;
      const userData = { id, username, email };
      const token = AuthServices.genToken(userData);

      userData.token = token;
      res.json(userData);
    } else {
      res.status(400).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const testAutentificator = async (req, res) => {
  try {
    res.json({ message: "autentificado", username: req.user });
  } catch (error) {
    console.log("poruqe entree");
    res.status(400).json(error.message);
  }
};
module.exports = {
  register,
  login,
  testAutentificator,
};
