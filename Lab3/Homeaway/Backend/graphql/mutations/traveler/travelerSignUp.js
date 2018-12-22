import { GraphQLNonNull } from "graphql";

import { customerType, customerInputType } from "../../types/traveler";
import TravelerModel from "../../../models/TravellerUser";

export default {
  type: customerType,
  args: {
    data: {
      name: "data",
      type: new GraphQLNonNull(customerInputType)
    }
  },
  resolve(root, params) {
    const uModel = new TravelerModel(params.data);
    const newUser = uModel.save();
    if (!newUser) {
      throw new Error("Error adding user");
    }
    return newUser;
  }
};
