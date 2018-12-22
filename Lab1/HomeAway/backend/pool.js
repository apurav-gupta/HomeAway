var mysql = require("mysql");
var pool = mysql.createPool({
  //connectionLimit: 1000,
  // secret: "Passphrase for encryption should be 45-50 char long",
  port: "3306",
  host: "localhost",
  user: "root",
  password: "",
  database: "homeaway"
});

module.exports = pool;
