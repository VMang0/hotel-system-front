import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
            alert('Please get verification code first.');
            return;
        }
        if (!email || !password || !verificationCode) {
            alert('Please enter all required information.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/registration', user);
            if (response.status === 200) {
                alert('User registered successfully!');
                navigate('/');
            }
        } catch (error) {
            alert('Registration failed. Please try again later.');
            console.error(error);
        }
    };

    const sendVerificationCode = async () => {
        if (!email) {
            alert('Please enter email address.');
            return;
        }
        try {
            await axios.post('http://localhost:8080/send-code', {email});
            setCodeSent(true);
        } catch (error) {
            alert('Failed to send verification code. Please try again later.');
            console.error(error);
        }
    };

        const verifyCode = async () => {
            if (!verificationCode) {
                alert('Please enter verification code.');
                return;
            }
            try {
                const response = await axios.post('http://localhost:8080/verify-code', { email, verificationCode });
                if (response.status === 200) {
                    alert('Verification successful!');
                    setVer_success(true);
                }
            } catch (error) {
                alert('Verification failed. Please try again later.');
                setVer_success(false)
                console.error(error);
            }
        };

        return (
            <div>
                <h2>Register</h2>
                <form onSubmit={onSubmit}>
                    <div>
                        <label>Email:</label>
                        <input type='email' name='email' value={email} onChange={onInputChange} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type='password' name='password' value={password} onChange={onInputChange} />
                    </div>
                    {codeSent ? (
                        <div>
                            <label>Verification Code:</label>
                            <input type='text' name='verificationCode' value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
                            <button type='button' onClick={verifyCode}>
                                Verify
                            </button>
                        </div>
                    ) : (
                        <button type='button' onClick={sendVerificationCode}>
                            Get Verification Code
                        </button>
                    )}

                    {ver_success ? <button type='submit'>Register</button> : ""}

                </form>
                <p>
                    Already have an account? <Link to='/login'>Login</Link>
                </p>
            </div>
        );
    }