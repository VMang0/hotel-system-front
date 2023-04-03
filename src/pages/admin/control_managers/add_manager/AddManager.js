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
        await axios.post("http://localhost:8080/add_manager", user)
        navigate("/admin/dashboard-manager");
    };
    return (
        <div className= "container-add-manager">
            <div className= "container-add-manager-window">
                <div className= "form-add">
                    <h3 className= "text-center m-3 ">Register Manager</h3>
                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">Email</label>
                            <input type= {"text"} className= "form-control" placeholder= "Enter your email" name = "email"
                                   value={email} onChange={(e)=> onInputChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">Password</label>
                            <input type= {"text"} className= "form-control" placeholder= "Enter your password" name = "password"
                                   value={password} onChange={(e)=> onInputChange(e)}/>
                        </div>
                        <button type="submit" className= "btn btn-outline-primary">Submit</button>
                        <Link  className= "btn btn-danger mx-2" to = {"/admin/dashboard-manager"}>Cancel</Link>

                    </form>
                </div>
            </div>
        </div>
    )
}