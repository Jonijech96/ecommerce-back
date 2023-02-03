const {Sequelize} = require('sequelize');

require('dotenv').config();

const db = new Sequelize({
    database:process.env.DB_NAME ,
    username:process.env.DB_USER ,
    port:process.env.DB_PORT ,
    password:process.env.DB_PASSWORD ,
    host:process.env.DB_HOST ,
    dialect: "postgres",
    logging: false,
});

module.exports = db;