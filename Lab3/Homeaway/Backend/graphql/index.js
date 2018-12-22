const graphql = require("graphql");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

var TravelerModel = require("../models/Customers");
var OwnerModel = require("../models/Owners");
var PropertyModel = require("../models/Properties");

var mutations = require("./mutations");
var queries = require("./queries");

const customerType = new GraphQLObjectType({
  name: "Traveler",
  fields: () => ({
    email: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    status: {
      type: GraphQLInt
    },
    token: {
      type: GraphQLString
    }
  })
});

const ownerType = new GraphQLObjectType({
  name: "Owner",
  fields: () => ({
    email: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    status: {
      type: GraphQLInt
    },
    token: {
      type: GraphQLString
    }
  })
});

const PropertyType = new GraphQLObjectType({
  name: "Property",
  fields: () => ({
    ownerEmail: {
      type: GraphQLString
    },
    location: {
      type: GraphQLString
    },
    headline: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    bedroom: {
      type: GraphQLInt
    },
    bathroom: {
      type: GraphQLInt
    },
    accommodation: {
      type: GraphQLInt
    },
    photos: {
      type: GraphQLString
    },

    rate: {
      type: GraphQLString
    },
    travellerEmail: {
      type: GraphQLString
    }
  })
});

const PropertyTypee = new GraphQLObjectType({
  name: "Properties",
  fields: () => ({
    properties: {
      type: GraphQLString
    },
    status: {
      type: GraphQLInt
    }
  })
});

const customerTypee = new GraphQLObjectType({
  name: "customerType",
  fields: () => ({
    profile: {
      type: GraphQLString
    },
    status: {
      type: GraphQLInt
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    travelerSignUp: {
      type: customerType,
      args: {
        email: {
          type: GraphQLString
        },
        firstname: {
          type: GraphQLString
        },
        lastname: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        }
      },
      resolve(root, params) {
        var data = {
          firstname: params.firstname,
          lastname: params.lastname,
          email: params.email,
          password: params.password
        };

        var res = {};

        return new Promise((resolve, reject) => {
          TravelerModel.findOne({ email: params.email }).then(user => {
            if (user) {
              res.status = 204;
              res.body = "Email already exists";
              console.log("Email already exists");
              console.log(user);
              resolve(res);
            } else {
              const newUser = new TravelerModel({
                firstname: params.firstname,
                lastname: params.lastname,
                email: params.email,
                password: params.password
              });

              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;

                  const payload = {
                    id: newUser.id,
                    email: newUser.email,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    type: "traveller"
                  }; // Create JWT Payload

                  const token = jwt.sign(payload, keys.secretOrKey);

                  newUser
                    .save()
                    .then(user => {
                      res.status = 200;
                      res.email = payload.email;
                      res.token = token;
                      console.log("Traveller created");
                      console.log(user);
                      resolve(res);
                    })
                    .catch(err => console.log(err));
                });
              });
            }
          });
        });
      }
    },

    ownerSignUp: {
      type: ownerType,
      args: {
        email: {
          type: GraphQLString
        },
        firstname: {
          type: GraphQLString
        },
        lastname: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
        phonenumber: {
          type: GraphQLString
        }
      },
      resolve(root, params) {
        var data = {
          firstname: params.firstname,
          lastname: params.lastname,
          email: params.email,
          password: params.password,
          phonenumber: params.phonenumber
        };

        var res = {};

        return new Promise((resolve, reject) => {
          OwnerModel.findOne({ email: params.email }).then(user => {
            if (user) {
              res.status = 204;
              res.body = "Email already exists";
              console.log(res.body);
              console.log(res.status);
              console.log(user);
              resolve(res);
            } else {
              const newUser = new OwnerModel({
                firstname: params.firstname,
                lastname: params.lastname,
                email: params.email,
                password: params.password,
                phonenumber: params.phonenumber
              });

              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;

                  const payload = {
                    id: newUser.id,
                    email: newUser.email,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    type: "owner"
                  }; // Create JWT Payload

                  const token = jwt.sign(payload, keys.secretOrKey);

                  newUser
                    .save()
                    .then(user => {
                      res.status = 200;
                      res.email = payload.email;
                      res.token = token;
                      res.val = "Owner successfully created";
                      console.log(res.val);
                      console.log(user);
                      resolve(res);
                    })
                    .catch(err => console.log(err));
                });
              });
            }
          });
        });
      }
    },

    travelerUpdate: {
      type: customerTypee,
      args: {
        email: {
          type: GraphQLString
        },
        firstName: {
          type: GraphQLString
        },
        lastName: {
          type: GraphQLString
        },
        phoneno: {
          type: GraphQLString
        },
        aboutme: {
          type: GraphQLString
        },
        country: {
          type: GraphQLString
        },
        company: {
          type: GraphQLString
        },
        school: {
          type: GraphQLString
        },
        languages: {
          type: GraphQLString
        },
        gender: {
          type: GraphQLString
        },
        city: {
          type: GraphQLString
        },
        hometown: {
          type: GraphQLString
        }
      },
      resolve(root, params) {
        var data = {
          firstName: params.firstName,
          lastName: params.lastName,
          email: params.email
        };
        data.profile = {
          phoneNo: params.phoneno,
          aboutMe: params.aboutme,
          country: params.country,
          company: params.company,
          school: params.school,
          languages: params.languages,
          gender: params.gender,
          city: params.city,
          hometown: params.hometown
        };

        var res = {};

        return new Promise((resolve, reject) => {
          TravelerModel.findOneAndUpdate(
            { email: params.email },
            { $set: data }
          )
            .then(profile => {
              if (!profile) {
                res.status = 400;
                resolve(res);
              }
              res.status = 200;
              res.profile = JSON.stringify(profile);

              resolve(res);
            })
            .catch(err => res.status(404).json(err));
        });
      }
    }
  }
});
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    travelerLogin: {
      type: customerType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        console.log("login user", args);
        var res = {};
        var result = {};
        // res.username = "abd";
        // res.response = "res";
        // return res;
        return new Promise((resolve, reject) => {
          TravelerModel.findOne({ email: args.username }).then(user => {
            // Check for user
            if (!user) {
              /* errors.email = 'User not found';
                             return res.status(404).json(errors);*/

              res.status = 400;
              console.log("Traveller doesn't exist");
              resolve(res);
            }

            // Check Password
            bcrypt.compare(args.password, user.password).then(isMatch => {
              if (isMatch) {
                // User Matched
                const payload = {
                  id: user.id,
                  username: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  type: "traveller"
                }; // Create JWT Payload

                // Sign Token
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  { expiresIn: 3600 },
                  (err, token) => {
                    res.status = 200;
                    res.token = "Bearer " + token;
                    console.log("Successfully signed in");
                    resolve(res);
                  }
                );
              } else {
                console.log("Password Wrong, write correct password");
                res.status = 404;
                console.log(res);
                resolve(res);
              }
            });
          });
        });
      }
    },

    ownerLogin: {
      type: ownerType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        console.log("login user", args);
        var res = {};
        var result = {};
        // res.username = "abd";
        // res.response = "res";
        // return res;
        return new Promise((resolve, reject) => {
          OwnerModel.findOne({ email: args.username }).then(user => {
            // Check for user
            if (!user) {
              /* errors.email = 'User not found';
                             return res.status(404).json(errors);*/

              res.status = 400;
              console.log(
                "Owner doesn't exist, enter correct email and address"
              );
              resolve(res);
            }

            // Check Password
            bcrypt.compare(args.password, user.password).then(isMatch => {
              if (isMatch) {
                // User Matched
                const payload = {
                  id: user.id,
                  email: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  type: "owner"
                }; // Create JWT Payload

                // Sign Token
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  { expiresIn: 3600 },
                  (err, token) => {
                    res.status = 200;
                    res.token = "Bearer " + token;
                    console.log("Owner logged in successfully");
                    console.log(token);
                    resolve(res);
                  }
                );
              } else {
                console.log("Password Wrong, write correct password");
                res.status = 404;
                console.log(res);
                resolve(res);
              }
            });
          });
        });
      }
    },
    ownerProperties: {
      type: PropertyTypee,
      args: {
        email: { type: GraphQLString }
      },
      resolve(parent, args) {
        console.log("owner properties", args);
        var res = {};
        var result = {};
        // res.username = "abd";
        // res.response = "res";
        // return res;
        return new Promise((resolve, reject) => {
          PropertyModel.find({ ownermail: args.email })
            .then(profile => {
              if (!profile) {
                res.status = 400;
                console.log("Owner ddidn't list any property");
                resolve(res);
              }
              res.status = 200;
              res.properties = JSON.stringify(profile);
              console.log(profile);
              console.log(res);
              resolve(res);
            })
            .catch(err => res.status(404).json(err));
        });
      }
    },
    customerBookedProperties: {
      type: PropertyTypee,
      args: {
        email: { type: GraphQLString }
      },
      resolve(parent, args) {
        console.log("Traveler properties", args);
        var res = {};
        var result = {};
        return new Promise((resolve, reject) => {
          PropertyModel.find({ email: args.email })
            .then(profile => {
              if (!profile) {
                res.status = 400;
                resolve(res);
              }
              res.status = 200;
              res.properties = JSON.stringify(profile);
              console.log(profile);
              console.log(res);
              resolve(res);
            })
            .catch(err => res.status(404).json(err));
        });
      }
    },
    ownerPropertiesBookings: {
      type: PropertyTypee,
      args: {
        email: { type: GraphQLString }
      },
      resolve(parent, args) {
        console.log("owner properties bookings", args);
        var res = {};
        var result = {};
        return new Promise((resolve, reject) => {
          PropertyModel.find({
            $and: [{ ownermail: args.email }, { isbooked: true }]
          })
            .then(profile => {
              if (!profile) {
                res.status = 400;
                console.log("No Bookings for this owner");
                resolve(res);
              }
              res.status = 200;
              res.properties = JSON.stringify(profile);
              console.log(profile);
              console.log(res);
              resolve(res);
            })
            .catch(err => res.status(404).json(err));
        });
      }
    },

    bookProperty: {
      type: PropertyType,
      args: {
        email: {
          type: GraphQLString
        },
        propID: {
          type: GraphQLString
        },
        isBooked: {
          type: GraphQLBoolean
        }
      },
      resolve(root, params) {
        var data = {
          email: params.email,
          propID: params.propID,
          isBooked: params.isBooked
        };
        data.profile = {
          email: params.email,
          propID: params.propID,
          isBooked: params.isBooked
        };

        var res = {};

        return new Promise((resolve, reject) => {
          TravelerModel.findOneAndUpdate(
            { email: params.email },
            { $set: data }
          )
            .then(profile => {
              if (!profile) {
                res.status = 400;
                resolve(res);
              }
              res.status = 200;
              res.profile = JSON.stringify(profile);
              resolve(res);
            })
            .catch(err => res.status(404).json(err));
        });
      }
    },

    updateTravelerProfile: {
      type: TravelerTypee,
      args: {
        email: {
          type: GraphQLString
        },
        firstName: {
          type: GraphQLString
        },
        lastName: {
          type: GraphQLString
        },
        phoneno: {
          type: GraphQLString
        }
      },
      resolve(root, params) {
        var data = {
          firstName: params.firstName,
          lastName: params.lastName,
          email: params.email
        };

        var res = {};

        return new Promise((resolve, reject) => {
          TravelerModel.findOneAndUpdate(
            { email: params.email },
            { $set: data }
          )
            .then(profile => {
              if (!profile) {
                res.status = 400;
                resolve(res);
              }
              res.status = 200;
              res.profile = JSON.stringify(profile);
              resolve(res);
            })
            .catch(err => res.status(404).json(err));
        });
      }
    },

    travelerProfile: {
      type: customerTypee,
      args: {
        email: { type: GraphQLString }
      },
      resolve(parent, args) {
        console.log("traveler profile", args);
        var res = {};
        var result = {};
        return new Promise((resolve, reject) => {
          TravelerModel.findOne({ email: args.email })
            .then(profile => {
              if (!profile) {
                res.status = 400;
                resolve(res);
              }
              res.status = 200;
              res.profile = JSON.stringify(profile);
              resolve(res);
            })
            .catch(err => res.status(404).json(err));
        });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
