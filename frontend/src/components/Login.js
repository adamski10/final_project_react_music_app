import React from "react";
import Logo from "./Logo";
import "./Login.css";


const Login = () => {

    return (
        <>
            <Logo />
            <button className="login-button">
                <a href="http://localhost:8080/login">Login with Spotify</a>
            </button>
        </>
    )

}

export default Login;