import {gql} from 'apollo-boost';

const cutomerSignUpMutation = gql`
    mutation TravelerSignUp($firstname: String, $lastname: String, $email: String, $password: String){
        travelerSignUp(firstname: $firstname, lastname: $lastname, email: $email, password: $password){
          status,
          token,
          email
           
        }
    }
`;


const ownerSignUpMutation = gql`
    mutation OwnerSignUp($firstname: String, $lastname: String, $email: String, $password: String, $phonenumber: String){
        ownerSignUp(firstname: $firstname, lastname: $lastname, email: $email, password: $password, phonenumber: $phonenumber){
          status,
          token,
          email
           
        }
    }
`;


const travelerUpdatee = gql`
    mutation TravelerUpdate($firstName: String, $lastName: String, $email: String, $phoneno: String, $aboutme: String, $country: String, $company: String, $school: String, $languages: String, $gender: String, $city: String, $hometown: String ){
        travelerUpdate(firstName: $firstName, lastName: $lastName, email: $email, phoneno: $phoneno, aboutme: $aboutme, country: $country, company: $company, school: $school, languages: $languages, gender: $gender, city: $city, hometown: $hometown){
          status,
          profile
           
        }
    }
`;

export {cutomerSignUpMutation, ownerSignUpMutation, travelerUpdatee};