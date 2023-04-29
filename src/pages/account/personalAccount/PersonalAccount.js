import "./PersonalAccount.css"
import {Link} from "react-router-dom";
import {useState} from "react";
import EditAccount from "../EditAccount/EditAccount";
import PersonalRequests from "../personalRequests/PersonalRequests";
export default function PersonalAccount(){
    const [activeLink, setActiveLink] = useState('/personal-account/edit');
    const handleLinkClick = (link) => {
        setActiveLink(link);
    };
    return(
        <div className="main-form-personal-account">
            <div className="name-page" ><span >Личный кабинет</span></div>
            <div className= "main-form">
                <div className="account-panel">
                    <div className="account-panel-list-form">
                        <ul className="account-panel-list">
                            <li><Link className={`${activeLink === '/personal-account/edit' ? "active-link" : ""}`}
                                      onClick={()=> handleLinkClick('/personal-account/edit')}>Личная информация</Link></li>
                            <li><Link className={`${activeLink === '/personal-account/requests' ? "active-link" : ""}`}
                                onClick={()=> handleLinkClick('/personal-account/requests')}>Мои бронирования</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="account-main-part">
                    {activeLink === '/personal-account/edit' && <EditAccount/>}
                    {activeLink === '/personal-account/requests' && <PersonalRequests/>}
                </div>
            </div>
        </div>
    )
}