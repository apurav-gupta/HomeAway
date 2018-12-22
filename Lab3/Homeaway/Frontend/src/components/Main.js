import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import {setCustomer, logoutCustomer} from "../actions/AuthActions";
import PrivateRoute from "../components/Private/PrivateRoute";

import CustomerSignup from "./Sign Up/CustomerSignup";
import CustomerLogin from "./Login/CustomerLogin";
import TravDashboard from "./CustomerDash/TravDashboard";
import CreateProfile from "./CustomerDash/CreateProfile";

import OwnerSignup from "./Sign Up/OwnerSignup";
import OwnerLogin from "./Login/OwnerLogin";
import Dashboard from "./OwnerDash/Dashboard";
import PropertyList from "./OwnerDash/PropertyList";
import PropDisplay from "./OwnerDash/PropDisplay";

import CardSearch from "./PropertySearch/CardSearch";
import propDetailShow from "./PropertySearch/PropertyDetails";
import customerInbox from "./CustomerDash/customerInbox";
import ownerInbox from "./OwnerDash/ownerInbox";
import ownerReply from "./OwnerDash/ownerReply";

import Home from "./Home/Home";
import {Redirect} from "react-router";
import PropBooked from "./OwnerDash/PropBooked";
import BookedProp from "./CustomerDash/BookedProp";

import {Provider} from "react-redux"; //hold the state acts as a store
import store from "../store";

import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-boost';

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql'
});

//Check for token
if (sessionStorage.JWTToken) {
    // Set Auth Token Header Auth
    setAuthToken(sessionStorage.JWTToken);
    // decode token and get user info
    const decoded = jwt_decode(sessionStorage.JWTToken);
    // Set user and is authenticated
    store.dispatch(setCustomer(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutCustomer());
        // Redirect to login
        window.location.href = "/Home";
    }
}

class Main extends Component {
    render() {
        return (
            <ApolloProvider store={store} client={client}>
                <div>
                    {/*Render Different Component based on Route*/}
                    <Route exact path="/" component={Home}/>
                    <Route path="/Home" component={Home}/>
                    <Route path="/CustomerLogin" component={CustomerLogin}/>
                    <Route path="/OwnerLogin" component={OwnerLogin}/>
                    <Route path="/CustomerSignup" component={CustomerSignup}/>
                    <Route path="/OwnerSignup" component={OwnerSignup}/>
                    <Switch>
                        {" "}
                        <PrivateRoute path="/PropertyList" component={PropertyList}/>{" "}
                    </Switch>
                    <Switch>
                        <Route path="/Dashboard" component={Dashboard}/>
                    </Switch>
                    <Switch>
                        {" "}
                        <Route path="/TravDashboard" component={TravDashboard}/>
                    </Switch>
                    <Switch>
                        {" "}
                        <Route path="/CreateProfile" component={CreateProfile}/>
                    </Switch>
                    <Switch>
                        {" "}
                        <Route path="/ownerInbox" component={ownerInbox}/>
                    </Switch>
                    <Switch>
                        {" "}
                        <Route path="/ownerReply" component={ownerReply}/>
                    </Switch>
                    <Switch>
                        {" "}
                        <Route path="/CardSearch" component={CardSearch}/>
                    </Switch>
                    <Switch>
                        {" "}
                        <Route path="/customerInbox" component={customerInbox}/>
                    </Switch>

                    <Switch>
                        {" "}
                        <Route
                            path="/propDetailShow"
                            component={propDetailShow}
                        />{" "}
                    </Switch>
                    <Switch>
                        {" "}
                        <Route path="/PropDisplay" component={PropDisplay}/>{" "}
                    </Switch>
                    <Switch>
                        {" "}
                        <Route path="/PropBooked" component={PropBooked}/>{" "}
                    </Switch>
                    <Switch>
                        {" "}
                        <Route path="/BookedProp" component={BookedProp}/>
                    </Switch>
                </div>
            </ApolloProvider>
        );
    }
}

//Export The Main Component
export default Main;
