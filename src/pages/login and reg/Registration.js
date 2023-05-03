import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {FaGithubAlt, FaInstagram, FaTelegramPlane, FaTwitter} from "react-icons/fa";
import "./Registration.css"
import {toast} from "react-toastify";
export default function Registration() {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [codeSent, setCodeSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [ver_success, setVer_success] = useState(false);

    const { email, password } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!codeSent) {
            toast.error('Сначала вам требутся получить код потверждения!');
            return;
        }
        if (!email || !password || !verificationCode) {
            toast.error('Заполните все поля!');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/registration', user);
            if (response.status === 200) {
                toast.success('Регистрация прошла успешно!');
                navigate('/');
            }
        } catch (error) {
            if (error.response.status === 409) {
                toast.error('Пользователь с таким email уже существует!');
            }else{
                toast.error('Регистрация не успешна. Пожалуйста, попробуйте через несколько минут!');
            }
            console.error(error);
        }
    };

    const sendVerificationCode = async () => {
        if (!email) {
            toast.error('Пожалуйста введите email!');
            return;
        }
        try {
            await axios.post('http://localhost:8080/send-code', {email});
            setCodeSent(true);
        } catch (error) {
            if (error.response.status === 400) {
                toast.error('Пользователь с таким email уже существует!');
            }else{
                toast.error('Не можем отправить код для потверждения. Пожалуйста попробуйте снова позже!');
            }
            console.error(error);
        }
    };

        const verifyCode = async () => {
            if (!verificationCode) {
                toast.error('Пожалуйста введите код потверждения!');
                return;
            }
            try {
                const response = await axios.post('http://localhost:8080/verify-code', { email, verificationCode });
                if (response.status === 200) {
                    toast.success('Код подтвержден!');
                    setVer_success(true);
                }
            } catch (error) {
                toast.error('Код не подтвержден. Попробуйте снова!');
                setVer_success(false)
                console.error(error);
            }
        };

    useEffect(() =>{
        const input = document.querySelector('.form_login');
        const label = document.querySelector('.label-input');
        const input_pass = document.querySelector('.form_login_pass');
        const label_pass = document.querySelector('.label-input-pass');
        const var_input = document.querySelector('.ver_code_input');

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

        var_input?.addEventListener('input',  ()=> {
            if (!var_input.value) {
                var_input.classList.add('error');
            } else {
                var_input.classList.remove('error');
            }

        });

    }, []);

        return (
            <div className= "main_container_page">
                <div className= "window login">
                    <form onSubmit={onSubmit}>
                        <div className="btn-navigate">
                            <div className="sign_in reg_page_sign_in"><Link to="/loginuser">Sign in</Link></div>
                            <div className="sign_up reg_page_sign_up" ><Link to="/registration">Register</Link></div>
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
                                <input className= "form_login" type='email' name='email' value={email} onChange={onInputChange} placeholder="Email"/>
                                <label className="label-input">Email</label>
                            </div>
                            <div className="input-login">
                                <input className= "form_login_pass" type='password' name='password' value={password} onChange={onInputChange} placeholder="Password" minLength="4" maxLength="20"/>
                                <label className="label-input-pass">Password</label>
                            </div>
                        </div>
                        {codeSent ? (
                            <div>
                                {!ver_success ? (
                                    <div className="input-login">
                                        <input className="ver_code_input" placeholder="Verification code" type='text' name='verificationCode' value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)}/>
                                        <button className="btn-reg" type='button' onClick={verifyCode}>Verify</button>
                                    </div> )
                                        : (<button className="btn-reg" type='submit'>Register</button>)}
                            </div>
                        ) : (
                            <div className="form-for-getcode">
                                <Link className="link_verification" type='button' onClick={sendVerificationCode}>Get Verification Code</Link>
                            </div>
                        )}

                    </form>
                </div>
            </div>
        );
    }