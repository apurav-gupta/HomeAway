import { gql } from "apollo-boost";

const travelerLogin = gql`
  query TravelerLogin($username: String, $password: String) {
    travelerLogin(username: $username, password: $password) {
      status
      token
      email
    }
  }
`;

const ownerLogin = gql`
  query OwnerLogin($username: String, $password: String) {
    ownerLogin(username: $username, password: $password) {
      status
      token
      email
    }
  }
`;

const ownerProperties = gql`
  query OwnerProperties($email: String) {
    ownerProperties(email: $email) {
      status
      properties
    }
  }
`;

const customerBookedProperties = gql`
  query CustomerBookedProperties($email: String) {
    customerBookedProperties(email: $email) {
      status
      properties
    }
  }
`;

const ownerPropertiesBookings = gql`
  query OwnerPropertiesBookings($email: String) {
    ownerPropertiesBookings(email: $email) {
      status
      properties
    }
  }
`;

const travelerProfile = gql`
  query TravelerProfile($email: String) {
    travelerProfile(email: $email) {
      status
      profile
    }
  }
`;

const updateTravelerProfile = gql`
  mutation TravelerUpdate(
    $firstName: String
    $lastName: String
    $email: String
    $phoneno: String
    $aboutme: String
    $country: String
    $company: String
    $school: String
    $languages: String
    $gender: String
    $city: String
    $hometown: String
  ) {
    travelerUpdate(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneno: $phoneno
      aboutme: $aboutme
      country: $country
      company: $company
      school: $school
      languages: $languages
      gender: $gender
      city: $city
      hometown: $hometown
    ) {
      status
      profile
    }
  }
`;

const propertyBooked = gql`
  mutation BookPropMutation(
    $travellerEmail: String
    $propID: String
    $isBooked: Boolean
  ) {
    bookPropMutation(
      travellerEmail: $travellerEmail
      propID: $propID
      isBooked: $isBooked
    ) {
      status
      token
      email
    }
  }
`;

export {
  travelerLogin,
  ownerLogin,
  ownerProperties,
  customerBookedProperties,
  ownerPropertiesBookings,
  travelerProfile,
  propertyBooked,
  updateTravelerProfile
};
