import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/loginuser", {
                email,
                password,
            });
            console.log(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/test');
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                {error && <div>{error}</div>}
                <div>
                    <label>Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
/*

import {  useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    async function login(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/login", {
                email: email,
                password: password,
            }).then((res) =>
            {
                console.log(res.data);

                if (res.data.message === "Email not exits")
                {
                    alert("Email not exits");
                }
                else if(res.data.message === "Login Success")
                {

                    navigate('/user');
                }
                else
                {
                    alert("Incorrect Email and Password not match");
                }
            }, fail => {
                console.error(fail); // Error!
            });
        }


        catch (err) {
            alert(err);
        }

    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <h2>Login</h2>
                    <hr/>
                </div>

                <div className="row">
                    <div className="col-sm-6">

                        <form>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email"  className="form-control" id="email" placeholder="Enter Name"

                                       value={email}
                                       onChange={(event) => {
                                           setEmail(event.target.value);
                                       }}

                                />

                            </div>

                            <div className="form-group">
                                <label>password</label>
                                <input type="password"  className="form-control" id="password" placeholder="Enter Fee"

                                       value={password}
                                       onChange={(event) => {
                                           setPassword(event.target.value);
                                       }}

                                />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={login} >Login</button>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;*/
