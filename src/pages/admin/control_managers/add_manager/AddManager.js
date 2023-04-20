import React, {useState} from 'react'
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import "./AddManager.css";

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
                navigate("/admin/dashboard-manager");
            }
        }catch (error){
            alert('Ошибка при добавлении менеджера. Пользователь с таким email уже существует!');
            console.error(error);
        }
    };
    return (
        <div className= "container-add-manager">
            <div className= "container-add-manager-window">
                <div className= "form-add">
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">Email</label>
                            <input type= "email" className= "form-control" placeholder= "Enter your email" name = "email"
                                   value={email} onChange={(e)=> onInputChange(e)} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">Password</label>
                            <input type= "password" className= "form-control" placeholder= "Enter your password" name = "password"
                                   value={password} onChange={(e)=> onInputChange(e)} required minLength="4" maxLength="20"/>
                        </div>
                        <button type="submit" className= "btn btn-outline-primary">Submit</button>
                        <Link  className= "btn btn-danger mx-2" to = {"/admin/dashboard-manager"}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}