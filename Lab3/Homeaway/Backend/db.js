var mysql = require("mysql");
var crypt = require("./crypt");
var pool = require("./pool");
var db = {};
/********************* OWNER SIGN-UP BCRYPT ****************** */
db.createOwner = function(user, successCallback, failureCallback) {
  console.log("In DB File");
  var passwordHash;
  crypt.createHash(
    user.password,
    function(res) {
      passwordHash = res;
      var sql =
        "INSERT INTO ownerprofile (firstname, lastname, email, password, phonenumber) VALUES ( " +
        mysql.escape(user.firstname) +
        " , " +
        mysql.escape(user.lastname) +
        " , " +
        mysql.escape(user.email) +
        " , " +
        mysql.escape(passwordHash) +
        " , " +
        mysql.escape(user.phonenumber) +
        " ) ";
      console.log(sql);
      pool.getConnection(function(err, connection) {
        if (err) {
          res.status(400).json({
            "Content-Type": "text/plain"
          });
          res.end("Could Not Get Connection Object");
        } else {
          connection.query(sql, function(err, rows, fields, res) {
            if (err) {
              console.log("Some error");
              console.log(err);
              failureCallback(err);
              return;
            }
            successCallback();
          });
        }
      });
    },
    function(err) {
      console.log(err);
      failureCallback();
    }
  );
};

/********************* CUSTOMER SIGN-UP BCRYPT ****************** */

db.createCustomer = function(user, successCallback, failureCallback) {
  console.log("In DB File");
  var passwordHash;
  crypt.createHash(
    user.password,
    function(res) {
      passwordHash = res;
      var sql =
        "INSERT INTO customerprofile (firstname, lastname, mailid, password)  VALUES ( " +
        mysql.escape(user.firstname) +
        " , " +
        mysql.escape(user.lastname) +
        " , " +
        mysql.escape(user.email) +
        " , " +
        mysql.escape(passwordHash) +
        " ) ";
      console.log(sql);
      pool.getConnection(function(err, connection) {
        if (err) {
          res.status(400).json({
            "Content-Type": "text/plain"
          });
          res.end("Could Not Get Connection Object");
        } else {
          connection.query(sql, function(err, rows, fields, res) {
            if (err) {
              console.log("Some error");
              console.log(err);
              failureCallback(err);
              return;
            }
            successCallback();
          });
        }
      });
    },
    function(err) {
      console.log(err);
      failureCallback();
    }
  );
};

/********************** OWNER LOGIN BCRYPT ******************* */

db.findOwner = function(user, successCallback, failureCallback) {
  var sql =
    "SELECT * FROM ownerprofile WHERE email = " + mysql.escape(user.username);
  console.log(sql);

  pool.getConnection(function(err, connection) {
    if (err) {
      console.log("inside DB");
      res.status(400).json({
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      connection.query(sql, function(err, rows, fields, res) {
        if (err) {
          console.log("inside error");
          failureCallback(err);
          return;
        }
        if (rows.length > 0) {
          console.log("Successful");
          successCallback(rows[0]);
        } else {
          console.log("UnSuccessful");
          failureCallback("User not found.");
        }
      });
    }
  });
};

/*********************** CUSTOMER LOGIN BCRYPT ********************** */

db.findCustomer = function(user, successCallback, failureCallback) {
  var sql =
    "SELECT * FROM customerprofile WHERE mailid = " +
    mysql.escape(user.username);
  console.log(sql);

  pool.getConnection(function(err, connection) {
    if (err) {
      console.log("inside DB");
      res.status(400).json({
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      connection.query(sql, function(err, rows, fields, res) {
        if (err) {
          console.log("inside error");
          failureCallback(err);
          return;
        }
        if (rows.length > 0) {
          console.log("Successful");
          successCallback(rows[0]);
        } else {
          console.log("UnSuccessful");
          failureCallback("User not found.");
        }
      });
    }
  });
};

module.exports = db;
