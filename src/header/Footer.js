import React, {useContext, useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import logo from "../css_all/img/logo.png";
import {TfiLocationPin, TfiTime, TfiEmail} from 'react-icons/tfi';
import {SlPhone} from 'react-icons/sl'
import './Footer.css';
import {FaGithubAlt, FaInstagram, FaTelegramPlane} from "react-icons/fa";
export function Footer() {
    return (
            <div className="container">
                <div className="footer_top">
                    <div className="left_content">
                        <div className="logo">
                            <img src={logo}></img>
                            <Link to="/" className="logo_text">VMANGO</Link>
                        </div>
                        <div className="left_content_top">
                            <div className="row_text_lef_content">
                                <TfiLocationPin className="icon_footer"/>
                                <p className="text_footer place">Республика Беларусь, 220030, <br></br> г. Минск, ул. Белецкого 50</p>
                            </div>
                            <div className="row_text_lef_content">
                                <TfiTime className="icon_footer"/>
                                <p className="text_footer">Круглосуточно</p>
                            </div>
                        </div>
                        <div className="left_content_bottom">
                            <div className="row_text_lef_content">
                                <TfiEmail className="icon_footer"/>
                                <p className="text_footer">valeriakorolova2703@gmail.com</p>
                            </div>
                            <div className="row_text_lef_content">
                                <SlPhone className="icon_footer"/>
                                <p className="text_footer">+375(44)7339153</p>
                            </div>
                        </div>
                    </div>
                    <div className="center_content">
                        <ul className="links_footer">
                            <li><Link className="links">Номера и апартаменты</Link></li>
                            <li><Link className="links">Контакты</Link></li>
                            <li><Link className="links">О нас</Link></li>
                            <li><Link className="links">Ресторан</Link></li>
                        </ul>
                    </div>
                    <div className="right_content">
                        <ul className="links_footer">
                            <li><Link className="links">Конференц-залы</Link></li>
                            <li><Link className="links">Оплата банковской картой</Link></li>
                            <li><Link className="links">Публичный договор</Link></li>
                            <li><Link className="links">Правила проживания</Link></li>
                            <li className="last_links">
                                <p>Следите за нами в соцсетях: </p>
                                <ul className="buttons_link">
                                    <li className="icons_footer_seti"><button className="btn_seti" ><FaInstagram /></button></li>
                                    <li className="icons_footer_seti"><button className="btn_seti" ><FaGithubAlt /></button></li>
                                    <li className="icons_footer_seti"><button className="btn_seti"><FaTelegramPlane /></button></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
    )
}

