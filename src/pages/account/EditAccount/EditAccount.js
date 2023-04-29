
import React, {useContext} from "react";
import {AuthContext} from "../../../contexts/authContext";
export default function EditAccount(){

    const {authData} = useContext(AuthContext);
    return(
        <div>
            <div className= "window-edit-account">
                    <div className="input-form">
                        <div className="input-login">
                            <input className= "form_login" value={authData.email} type='email' name='email' placeholder="Email" disabled/>
                            <label className="label-input">Email</label>
                        </div>
                        <div className="input-login">
                            <input className= "form_login_pass" type='password' placeholder="Password" minLength="4" maxLength="20"/>
                            <label className="label-input-pass">Password</label>
                        </div>
                    </div>
                        <div>
                            <button className="btn-reg" type='submit'>Сохранить</button>
                        </div>
            </div>
        </div>
    )
}