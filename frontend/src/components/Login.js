import React from "react";
import Logo from "./Logo";
import "./Login.css";


const Login = () => {

    return (
        <div id="login-page">
            <Logo />
            <button className="login-button">
                <a href="http://localhost:8080/login">Login with Spotify</a>
            </button>
        </div>
    )

}

export default Login;