import React from "react";
import Logo from "./Logo"


const Login = () => {

    return (
        <div id="login-page">
            <Logo />
            <button>
                <a href="http://localhost:8080/login">Login with Spotify</a>
            </button>
        </div>
    )

}

export default Login;