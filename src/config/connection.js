const { Sequelize } = require("sequelize");
require("dotenv").config();



const db = {};

console.log(process.env.DB_ENV);


  let sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      port: process.env.DB_PORT,
      // logging: false
    }
  );
  db.sequelize = sequelize;


module.exports = {
  db,
};
