import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from "../../contexts/authContext";
import "./Login.css";
import { FaInstagram , FaGithubAlt, FaTelegramPlane, FaTwitter} from 'react-icons/fa';
import {toast} from "react-toastify";

export function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {setAuthData } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/loginuser", {
                email,
                password,
            });

            localStorage.setItem('user', JSON.stringify(response.data));
            setAuthData(response.data);
            toast.success('Добро пожаловать!');
            navigate('/');
            console.log(response.status)
        } catch (error) {
            toast.error('Проверьте корректность введенных данных!');
        }
    };

    useEffect(() =>{
        var input = document.querySelector('.form_login');
        var label = document.querySelector('.label-input');
        var input_pass = document.querySelector('.form_login_pass');
        var label_pass = document.querySelector('.label-input-pass');

        input.addEventListener('input', function() {
            if (input.value) {
                label.classList.add('filled');
            } else {
                label.classList.remove('filled');
            }
        });

        input_pass.addEventListener('input', function() {
            if (input_pass.value) {
                label_pass.classList.add('filled');
            } else {
                label_pass.classList.remove('filled');
            }
        });
    }, []);

    
    return (
        <div className= "main_container_page">
            <div className= "window login">
                <form onSubmit={handleSubmit}>
                    <div className="btn-navigate">
                        <div className="sign_in log_page_sign_in"><Link >Sign in</Link></div>
                        <div className="sign_up log_page_sign_up" ><Link to="/registration">Register</Link></div>
                    </div>
                    <div className="form-for-icon-login">
                        <ul className="list_icon_login">
                            <li><button className="icon_btn_login instagram_login" ><FaInstagram/></button></li>
                            <li><button className="icon_btn_login github_login" ><FaGithubAlt/></button></li>
                            <li><button className="icon_btn_login telegram_login"><FaTelegramPlane /></button></li>
                            <li><button className="icon_btn_login telegram_login"><FaTwitter/></button></li>
                        </ul>
                    </div>
                    <div className="input-form">
                        <div className="input-login">
                            <input className= "form_login" id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            <label className="label-input">Email</label>
                        </div>
                        <div className="input-login">
                            <input className= "form_login_pass" id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            <label className="label-input-pass">Password</label>
                        </div>
                    </div>
                    <button className="btn-login" type="submit" >Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
