import React from "react";
import { useState, useEffect } from "react";
import "./login.css"
import { checkIsAdmin } from "../../../services/adminService";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        checkIsAdmin(username, password).then((data) => {
            console.log(data)
            if (data.success) {
                console.log("RELOAD")
                window.location.reload();
            } else if(data.errors) {
                alert("Gebruikersnaam of wachtwoord is fout");
            }
        }).catch((error) => {
            console.log(error);
        });;
    }


    return (
        <>
            <p>
                Log in als admin om aanpassingen te doen
            </p>
            <form className="loginForm">
                <label htmlFor="username">
                    Gebruikersnaam
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" id="username" name="username" placeholder="Gebruikersnaam" required className="input"/>
                </label>
                <label htmlFor="password">
                    Wachtwoord
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Wachtwoord" required className="input"/>
                </label>
                <input type="submit" onClick={handleSubmit} value="Log in" className="button submit-button inherit-font"/>
            </form>
        </> 
    );
}

export default Login;