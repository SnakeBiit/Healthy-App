import React, { useState, useEffect } from "react";
import Main from "../Main";
import Nav from "../Nav";
import "semantic-ui-css/semantic.min.css";
import { getUser } from "../../api";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    useEffect(() => {
        getUser().then(data => {
            if (!data) return;
            console.log("TEST:" + data);
            setUserData(data);
        });
    }, []);

    useEffect(() => {
        if (userData) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [userData]);

    return (
        <div>
            <Nav isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Main
                userId={userData ? userData.id : ""}
                isLoggedIn={isLoggedIn}
                handleLogin={handleLogin}
            />
        </div>
    );
};

export default App;
