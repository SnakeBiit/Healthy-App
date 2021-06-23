import React, { Component } from "react";
import { Switch, Route } from "react-router";
import Login from "../Login";
import { Message } from "semantic-ui-react";
import LoginDoctor from "../LoginDoctor";
import LoginPatient from "../LoginPatient";
import RegisterDoctor from "../RegisterDoctor";
import RegisterPatient from "../RegisterPatient";
import { Home, HomePatient, HomeDoctor } from "../Home";
import ProfilePatient from "../ProfilePatient";
import ProfileDoctor from "../ProfileDoctor";
import MedicalRecord from "../MedicalRecord";
import PatientProgress from "../PatientProgress";

class Main extends Component {
    render() {
        const error = () => (
            <Message
                icon="warning circle"
                header="Ups... Error!"
                content="Please go back and try again."
            />
        );
        return (
            <Switch>
                <Route exact path="/">
                    <Home isAuthenticated={this.props.isLoggedIn} />
                </Route>
                <Route path="/login" component={Login} />
                <Route path="/login_doctor">
                    <LoginDoctor handleLogin={this.props.handleLogin} />
                </Route>
                <Route path="/login_patient">
                    <LoginPatient handleLogin={this.props.handleLogin} />
                </Route>
                <Route path="/register_doctor" component={RegisterDoctor} />
                <Route path="/register_patient" component={RegisterPatient} />
                <Route path="/homepage">
                    <Home isAuthenticated={this.props.isLoggedIn} />
                </Route>
                <Route path="/patient/profile">
                    <ProfilePatient />
                </Route>
                <Route path="/doctor/profile" component={ProfileDoctor} />

                <Route path="/patient/medicalRecord">
                    <MedicalRecord isAuthenticated={this.props.isLoggedIn} />
                </Route>
                <Route path="/patient/treatmentProgress">
                    <PatientProgress isAuthenticated={this.props.isLoggedIn} />
                </Route>

                <Route path="/patient">
                    <HomePatient
                        isAuthenticated={this.props.isLoggedIn}
                        userId={this.props.userId}
                    />
                </Route>
                <Route path="/doctor">
                    <HomeDoctor
                        isAuthenticated={this.props.isLoggedIn}
                        userId={this.props.userId}
                    />
                </Route>

                <Route render={error} />
            </Switch>
        );
    }
}

export default Main;
