import React, {useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./AddManager.css";
import {HiOutlineArrowLeft} from "react-icons/hi"
import {toast} from "react-toastify";

export default function AddManager() {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password:"",
    })
    const{email, password} = user;
    const onInputChange = (e)=>{
        setUser({...user,[e.target.name]: e.target.value});
    };

    const onSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/add_manager", user)
            if(response.status === 200){
                toast.success('Менеджер успешно зарегистрирован!');
                navigate("/admin/dashboard-manager");
            }
        }catch (error){
            toast.error('Пользователь с таким email уже существует!');
            console.error(error);
        }
    };
    return (
        <div className="main-container-add-manager">
            <div className="name-page"><span>Регистрация менеджера</span></div>
            <div className= "container-add-manager">
                <div className= "container-add-manager-window">
                    <div className="form-for-cancel">
                        <button className= "btn-cancel-add-manager" onClick={()=> navigate("/admin/dashboard-manager")}><HiOutlineArrowLeft/></button>
                    </div>
                    <div className= "form-add">
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="input-login">
                                <input className= "form_login"
                                       type= "email"
                                       placeholder= "Email"
                                       name = "email"
                                       value={email}
                                       onChange={(e)=> onInputChange(e)}
                                       required />
                                <label className="label-input">Email</label>

                            </div>
                            <div className="input-login">
                                <input className= "form_login_pass"
                                       type= "password"
                                       placeholder= "Password"
                                       name = "password"
                                       value={password}
                                       onChange={(e)=> onInputChange(e)}
                                       required minLength="4" maxLength="20"/>
                                <label className="label-input-pass">Password</label>
                            </div>
                            <button type="submit" className= "btn-add-manager">Добавить</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}