import React, {useEffect, useState} from 'react'
import { FaInstagram , FaGithubAlt, FaTelegramPlane, FaRegUserCircle} from 'react-icons/fa';
import './Nav.css';
import {Link} from "react-router-dom";

export default function Nav() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!user);

    /*useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsAuthenticated(true);

        }
    }, []);*/

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        window.location.href = '/';

    };

    return (
        <div className="container">
            <nav className="navbar">
                <div className="left_navbar">
                    <ul className="list_icon">
                        <li><p className="link_style">+375(44)7339153</p></li>
                        <li><button className="icon_btn instagram" ><FaInstagram /></button></li>
                        <li><button className="icon_btn github" ><FaGithubAlt /></button></li>
                        <li><button className="icon_btn telegram"><FaTelegramPlane /></button></li>
                    </ul>
                </div>
                <Link className="center_navbar" to = "/"><p className="white_text">VMANGO</p></Link>
                <div className="right_navbar">
                    <div className="right_navbar">
                        {isAuthenticated
                            ? <Link className="btn btn-5" onClick={handleLogout}>Выйти</Link>
                            : <Link className="btn btn-5" to="/loginuser">Войти</Link>

                        }
                    </div>
                </div>
            </nav>
            <div>
                <ul className="links-header">
                    <li><Link to = "/" className="link">Номера и апартаменты</Link></li>
                    <li><Link to = "/" className="link">Контакты</Link></li>
                    <li><Link to = "/test" className="link">О нас</Link></li>
                    <li><Link to = "/" className="link">Ресторан</Link></li>
                    <li><Link to = "/" className="link">Конференц-залы</Link></li>
                </ul>
            </div>

        </div>
    )
}


