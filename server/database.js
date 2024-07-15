const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Connected to the ecommerce DB!");
  connection.release();
});

module.exports = pool.promise();
