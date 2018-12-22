const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Customer = mongoose.model("customers");
const dbkey = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = dbkey.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Customer.findOne(jwt_payload.username)
        .then(customer => {
          if (customer) {
            return done(null, customer);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
