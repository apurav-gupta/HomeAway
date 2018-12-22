var {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} = require("graphql");

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
    }
  })
});

const customerInputType = new GraphQLInputObjectType({
  name: "customerInput",
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
    }
  })
});

(module.exports = customerInputType), customerType;
