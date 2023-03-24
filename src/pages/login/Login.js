import React, {useContext, useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../contexts/authContext";
import "./Login.css"

export function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setAuthData } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/loginuser", {
                email,
                password,
            });
            console.log(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            setAuthData(response.data);
            navigate('/test');
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="container_main">
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
