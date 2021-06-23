import React, { useState, useEffect } from "react";
import { Header, Menu, Button, Image } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import {  logout, getType } from "../../api";
import { Redirect } from "react-router-dom";

const MenuLogout = props => {
    const [type, setType] = useState("");
    getType().then(data => {
        if (!data) return;
        setType(data);
    });
    const onLogout = () => {
        logout();
        props.handleLogout();
    };
    return (
        <React.Fragment>
            <Menu.Item
                position="right"
                key="profile"
                name="My Profile"
                as={NavLink}
                to={`/${type}/profile`}
            />

            {type == "patient" && (
                <Menu.Item
                    key="medicalRecord"
                    name="Medical Record"
                    as={NavLink}
                    to="/patient/medicalRecord"
                />
            )}

            <Menu.Item
                data-testid="logoutButton"
                key="logout"
                name="logout"
                as={Button}
                onClick={onLogout}
            />
        </React.Fragment>
    );
};

const MenuLogin = () => (
    <React.Fragment>
        <Menu.Item
            position="right"
            key="login"
            name="login"
            as={NavLink}
            to={"/login"}
        />
    </React.Fragment>
);

class Nav extends React.Component {
    render() {
        const { isLoggedIn, handleLogout } = this.props;
        return (
            <Menu tabular pointing secondary color="blue">
                <Menu.Item>
                    <Header
                        data-test="header"
                        as="h3"
                        floated="right"
                        icon="heartbeat"
                        color="blue"
                        as={Link}
                        to="/"
                    ></Header>
                </Menu.Item>
                {isLoggedIn ? (
                    <MenuLogout handleLogout={handleLogout} />
                ) : (
                    <React.Fragment>
                        <MenuLogin />
                        <Redirect to="/" />
                    </React.Fragment>
                )}
            </Menu>
        );
    }
}

export default Nav;
