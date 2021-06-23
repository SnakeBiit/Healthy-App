import React, { Component } from "react";
import "./Login.css";
import doctor from "../Assets/doctor.svg";
import patient from "../Assets/patient.svg";
import { NavLink } from "react-router-dom";

class Login extends Component {
    render() {
        return (
            <div className="container">
                <div className="containerDoctor">
                    <NavLink to="/login_doctor">
                        <div className="image_big">
                            <img src={doctor} className="image"></img>
                            <div className="middle">
                                <div className="text">Doctor</div>
                            </div>
                        </div>
                    </NavLink>
                </div>

                <div className="containerPatient">
                    <NavLink to="login_patient">
                        <div className="image_big">
                            <img src={patient} className="image"></img>
                            <div className="middle">
                                <div className="text">Patient</div>
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default Login;
