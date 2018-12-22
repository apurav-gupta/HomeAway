const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");
const app = express();
app.use(morgan("dev"));

const customers = require("./routes/api/customers");
const owners = require("./routes/api/owners");
const properties = require("./routes/api/properties");
const photos = require("./routes/api/photos");

const session = require("express-session");
var cookieParser = require("cookie-parser");
const cors = require("cors");
var graphqlHTTP = require("express-graphql");

// Body parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//MONGODB Config

const dbkey = require("./config/keys").mongoURI;

// Connect to Mongo Db
mongoose
  .connect(dbkey)
  .then(
    () => console.log("GraphQL Connected"),
    console.log("MongoDB Connected!!")
  )
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

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

// Allow Access Control
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

//Use Routes:
app.use("/api/customers", customers);
app.use("/api/owners", owners);
app.use("/api/properties", properties);
app.use("/api/photos", photos);

var schema = require("./graphql");

// GraphQL API
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
