import React, { useState, useContext } from "react";
import { createSession } from "../../services/api";
import "./style.css"
import { AuthContext } from "../../contexts/auth";

const LoginPage = () => {
     
    const {authenticated, user, login} = useContext(AuthContext)
    const [email, setEmail] =  useState("")
    const [password, setPassword] =  useState("")


    const handleLogin = async () => {
        console.log("Email:", email)
        console.log("Senha:", password)

        const response = await createSession(email, password)
        console.log("login:", response.data)
        login(email, password)

    }

    return <div id="login">
        <h2 className="title">Login</h2>
        <p> Authethicated: {JSON.stringify(authenticated)}</p>
        <p> User: {JSON.stringify(user)}</p>
        <div className="form">
            <div className="field">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="field">
                <label htmlFor="password">Senha:</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="actions">
                <button onClick={handleLogin}>Entrar</button>
            </div>
        </div>
    </div>
}

export default LoginPage