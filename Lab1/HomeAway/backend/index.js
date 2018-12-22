//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
app.set("view engine", "ejs");
var mysql = require("mysql");
var pool = require("./pool");
var crypt = require("./crypt");
var db = require("./db");
var multer = require("multer");
const path = require("path");
const fs = require("fs");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "homeaway_secret_sql",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

/************************ OWNER LOGIN ****************************** */

app.post("/OwnerLogin", function(request, response) {
  db.findOwner(
    {
      username: request.body.username
    },
    function(res) {
      var user = {
        username: res.username
      };

      // Check if password matches
      console.log(res.password);
      crypt.compareHash(
        request.body.password,
        res.password,
        function(err, isMatch) {
          if (isMatch && !err) {
            response.cookie("cookie", "admin", {
              maxAge: 900000,
              httpOnly: false,
              path: "/"
            });
            response.status(200).json({ success: true });
          } else {
            console.log("Password Wrong");
            response.status(400).json({
              success: false,
              message: "Authentication failed. Passwords did not match."
            });
          }
        },
        function(err) {
          console.log(err);
          response.status(400).json({
            success: false,
            message: "Authentication failed. User not found."
          });
        }
      );
    },
    function(err) {
      console.log(err);
      response.status(400).json({
        success: false,
        message: "Authentication failed. User not found."
      });
    }
  );
});

/******************** OWNER SIGN UP ******************************* */

app.post("/OwnerSignup", function(request, response) {
  console.log("Inside Create Request Handler");
  console.log(request.body.firstname);
  console.log(request.body.lastname);
  console.log(request.body.phonenumber);
  console.log(request.body.email);
  console.log(request.body.password);
  if (!request.body.email || !request.body.password) {
    response
      .status(400)
      .json({ success: false, message: "Please enter username and password." });
  } else {
    var newUser = {
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      email: request.body.email,
      password: request.body.password,
      phonenumber: request.body.phonenumber
    };

    // Attempt to save the user
    db.createOwner(
      newUser,
      function(res) {
        response
          .status(200)
          .json({ success: true, message: "Successfully created new user." });
        console.log("Successfully created new Owner User");
      },
      function(err) {
        console.log(err);
        return response.status(400).json({
          success: false,
          message: "That username address already exists."
        });
      }
    );
  }
});

/********************* CUSTOMER LOGIN ********************* */

app.post("/CustomerLogin", function(request, response) {
  db.findCustomer(
    {
      username: request.body.username
    },
    function(res) {
      var user = {
        username: res.username
      };

      // Check if password matches
      console.log(res.password);
      crypt.compareHash(
        request.body.password,
        res.password,
        function(err, isMatch) {
          if (isMatch && !err) {
            response.cookie("cookie", "admin", {
              maxAge: 900000,
              httpOnly: false,
              path: "/"
            });
            response.status(200).json({ success: true });
          } else {
            console.log("Password Wrong");
            response.status(400).json({
              success: false,
              message: "Authentication failed. Passwords did not match."
            });
          }
        },
        function(err) {
          console.log(err);
          response.status(400).json({
            success: false,
            message: "Authentication failed. User not found."
          });
        }
      );
    },
    function(err) {
      console.log(err);
      response.status(400).json({
        success: false,
        message: "Authentication failed. User not found."
      });
    }
  );
});

/**************** CUSTOMER SIGN UP ***************** */

app.post("/CustomerSignup", function(request, response) {
  console.log("Inside Create Request Handler");
  if (!request.body.email || !request.body.password) {
    response
      .status(400)
      .json({ success: false, message: "Please enter username and password." });
  } else {
    var newUser = {
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      email: request.body.email,
      password: request.body.password
    };

    // Attempt to save the user
    db.createCustomer(
      newUser,
      function(res) {
        response
          .status(200)
          .json({ success: true, message: "Successfully created new user." });
        console.log("Successfully created new user.");
      },
      function(err) {
        console.log(err);
        return response.status(400).json({
          success: false,
          message: "That username address already exists."
        });
        console.log("That username address already exists.");
      }
    );
  }
});

/************** UPDATE CUSTOMER PROFILE ************ */

// var storagee = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now() + ".jpg");
//   }
// });

// var uploadd = multer({ storage: storagee });

app.post("/updatetraveller", function(req, res) {
  console.log("Inside Login Post Request");
  var username = req.body.username;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  //var photo = req.body.photo;
  var email = req.body.mailid;
  var about = req.body.about;
  var street = req.body.street;
  var city = req.body.city;
  var state = req.body.state;
  var country = req.body.country;
  var work = req.body.work;
  var school = req.body.school;
  var hometown = req.body.hometown;
  // var gender = req.body.gender;
  var primarycontact = req.body.primarycontact;
  var secondarycontact = req.body.secondarycontact;
  var sql =
    "UPDATE customerprofile SET firstname = " +
    mysql.escape(firstname) +
    " ,lastname =" +
    mysql.escape(lastname) +
    " ,mailid =" +
    mysql.escape(email) +
    " ,about =" +
    mysql.escape(about) +
    " ,street =" +
    mysql.escape(street) +
    " ,city =" +
    mysql.escape(city) +
    " ,state =" +
    mysql.escape(state) +
    " ,country =" +
    mysql.escape(country) +
    " ,work =" +
    mysql.escape(work) +
    " ,school =" +
    mysql.escape(school) +
    " ,hometown =" +
    mysql.escape(hometown) +
    // "gender =" +
    // mysql.escape(gender) +
    " ,primarycontact =" +
    mysql.escape(primarycontact) +
    " ,secondarycontact =" +
    mysql.escape(secondarycontact);
  "WHERE mailid = " + mysql.escape(username);

  console.log(sql);
  pool.getConnection(function(err, con) {
    if (err) {
      console.log("inside DB");
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          console.log("Invalid Credentials");
          console.log(res.err);
          res.end("Invalid Credentials");
        } else {
          res.cookie("cookie", "admin", {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });
          req.session.user = result;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          res.end("Successful Login");
          console.log("Successful Updated The Profile !!!");
        }
      });
    }
  });
});

/****************LIST A PROPERTY ********************* */

app.post("/PropertyList", function(req, res) {
  console.log("Inside Create Request Handler");
  console.log(req.body.ownermail);
  var storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, "./uploads");
    },
    filename: function(req, file, callback) {
      callback(null, file.fieldname + "-" + Date.now());
    }
  });
  var upload = multer({ storage: storage }).array("userPhoto", 5);

  var sql =
    "INSERT INTO propertydetails" +
    "( ownermail, location, headline, description, property_type, bedrooms," +
    "accomodates, bathrooms, arrival_date, depart_date, currtype, dailyrate) VALUES ( " +
    mysql.escape(req.body.ownermail) +
    " , " +
    mysql.escape(req.body.location) +
    " , " +
    mysql.escape(req.body.headline) +
    " , " +
    mysql.escape(req.body.about) +
    " , " +
    mysql.escape(req.body.propertytype) +
    " , " +
    mysql.escape(req.body.beds) +
    " , " +
    mysql.escape(req.body.accomodates) +
    " , " +
    mysql.escape(req.body.baths) +
    " , " +
    // mysql.escape(req.body.arrivedate) +
    //" , " +
    mysql.escape(req.body.arrivedate) +
    " , " +
    mysql.escape(req.body.departdate) +
    " , " +
    mysql.escape(req.body.currtype) +
    " , " +
    mysql.escape(req.body.price) +
    " ) ";
  console.log(sql);

  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          console.log("In DB");
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Error While Creating Customer Information");
        } else {
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          res.end("Customer Details Created Successfully");
        }
      });
    }
  });
});

/***************************DISPLAY PROPERTY AFTER SEARCH ****************** */

app.post("/PropertySearch", function(req, res) {
  console.log("Inside Propoerty Search Post Request");
  console.log(req.body.location);
  console.log(req.body.arrival_date);
  console.log(req.body.depart_date);
  console.log(req.body.accomodates);
  var sql =
    "SELECT * FROM propertydetails WHERE location = " +
    mysql.escape(req.body.location) +
    " and arrival_date <= " +
    mysql.escape(req.body.arrival_date) +
    " and depart_date >= " +
    mysql.escape(req.body.depart_date) +
    " and accomodates >= " +
    mysql.escape(req.body.accomodates);
  console.log(sql);
  pool.getConnection(function(err, con) {
    if (err) {
      console.log("inside DB");
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          console.log("Invalid Credentials");
          res.end("Invalid Credentials");
        } else {
          res.cookie("cookie", "admin", {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });
          req.session.user = result;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          res.end(JSON.stringify(result));
          console.log("Successful Login !!!");
        }
      });
    }
  });
});

/***************** DISPLAY OWNER'S PROPERTIES ************************ */

app.post("/PropertyDisplay", function(req, res) {
  console.log("Inside Property Display Post Request");
  console.log(req.body.mail);
  var sql =
    "SELECT * FROM propertydetails WHERE ownermail = " +
    mysql.escape(req.body.mail);
  console.log(sql);
  pool.getConnection(function(err, con) {
    if (err) {
      console.log("inside DB");
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          console.log("Invalid Credentials");
          res.end("Invalid Credentials");
        } else {
          res.cookie("cookie", "admin", {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });
          req.session.user = result;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          res.end(JSON.stringify(result));
          console.log("Successful Login !!!");
        }
      });
    }
  });
});

/**********************DISPLAY SELECTED PROPERTY CARD ********************* */
app.get("/propDetailShow", function(req, res) {
  console.log("Inside Prop Card Display Post Request");
  console.log(req.query.PropID);
  var properid = req.query.PropID;
  var sql =
    "SELECT * FROM propertydetails WHERE propertyid = " +
    mysql.escape(properid);
  console.log(sql);
  pool.getConnection(function(err, con) {
    if (err) {
      console.log("inside DB");
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          console.log("Invalid Credentials");
          res.end("Invalid Credentials");
        } else {
          res.cookie("cookie", "admin", {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });
          req.session.user = result;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          res.end(JSON.stringify(result));
          console.log("Successful Login !!!");
        }
      });
    }
  });
});

/*********************************** BOOKING Property ********************************** */

app.post("/propBooked", function(req, res) {
  console.log("Inside Login Post Request");
  console.log(req.body.custmail);
  console.log(req.body.isbooked);
  console.log(req.body.PropID);
  var custmail = req.body.custmail;
  var isbooked = req.body.isbooked;
  var houseId = req.body.houseId;
  var sql =
    "UPDATE propertydetails SET isbooked = " +
    mysql.escape(isbooked) +
    " ,customermail =" +
    mysql.escape(custmail) +
    " WHERE propertyid = " +
    mysql.escape(houseId);

  console.log(sql);
  pool.getConnection(function(err, con) {
    if (err) {
      console.log("inside DB");
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          console.log("Invalid Credentials");
          res.end("Invalid Credentials");
        } else {
          res.cookie("cookie", "admin", {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });
          req.session.user = result;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          res.end(JSON.stringify(result));
          console.log("Successful Login !!!");
        }
      });
    }
  });
});

/***************** DISPLAY OWNER'S Booked PROPERTIES ************************ */

app.post("/HouseBooked", function(req, res) {
  console.log("Inside Property Booked Display Post Request");
  console.log(req.body.mail);
  var sql =
    "SELECT * FROM propertydetails WHERE ownermail = " +
    mysql.escape(req.body.mail) +
    " and isbooked = 1";
  console.log(sql);
  pool.getConnection(function(err, con) {
    if (err) {
      console.log("inside DB");
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          console.log("Invalid Credentials");
          res.end("Invalid Credentials");
        } else {
          res.cookie("cookie", "admin", {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });
          req.session.user = result;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          res.end(JSON.stringify(result));
          console.log("Successful Login !!!");
        }
      });
    }
  });
});

/***************** DISPLAY Traveler'S Booked PROPERTIES ************************ */

app.post("/MyBookings", function(req, res) {
  console.log("Inside Traveler Booked Post Request");
  console.log(req.body.mail);
  var sql =
    "SELECT * FROM propertydetails WHERE customermail = " +
    mysql.escape(req.body.mail);
  console.log(sql);
  pool.getConnection(function(err, con) {
    if (err) {
      console.log("inside DB");
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          console.log("Invalid Credentials");
          res.end("Invalid Credentials");
        } else {
          res.cookie("cookie", "admin", {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });
          req.session.user = result;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          res.end(JSON.stringify(result));
          console.log("Successful Login !!!");
        }
      });
    }
  });
});

/******************Image Upload *************************** */

// var storage = multer.diskStorage({
//   destination: function(req, file, callback) {
//     callback(null, "uploads/");
//   },
//   filename: function(req, file, callback) {
//     callback(null, file.originalname);
//     //  addPhotosToDB(req.query.uid,file.originalname)
//   }
// });
// var upload = multer({ storage: storage }).any();

// function addPhotosToDB(uid, imageName) {
//   var sql =
//     "INSERT INTO propertyphotos (propid, image) VALUES ( " +
//     mysql.escape(uid) +
//     " , " +
//     mysql.escape(imageName) +
//     " ) ";
//   pool.getConnection(function(err, con) {
//     if (err) {
//       console.log(err);
//     } else {
//       con.query(sql, function(err, result) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("Photo added");
//         }
//       });
//     }
//   });
// }

// app.post("/uploadPhotos", function(req, res) {
//   upload(req, res, function(err) {
//     //console.log(req.body);
//     //console.log(req.files);
//     if (err) {
//       return res.end("Error uploading file.");
//     }
//     res.writeHead(200, {
//       "Content-Type": "text/plain"
//     });
//     res.end("File is uploaded");
//   });
// });

// app.post("/download/:file(*)", (req, res) => {
//   console.log("inside download file");
//   var file = req.params.file;
//   var fileLocation = path.join(__dirname + "/public/uploads", file);
//   var img = fs.readFileSync(fileLocation);
//   var base64img = new Buffer(img).toString("base64");
//   res.writeHead(200, { "Content-Type": "image/jpg" });
//   res.end(base64img);
// });

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
