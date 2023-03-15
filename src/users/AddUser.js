import React, {useState} from 'react'
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

export default function AddUser() {
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
        await axios.post("http://localhost:8080/registration", user)
        navigate("/");
    };
    return (
        <div className= "container">
            <div className= "row">
                <div className= "col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h3 className= "text-center m-3 ">Register User</h3>
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
                        <Link  className= "btn btn-danger mx-2" to = {"/"}>Cancel</Link>

                    </form>
                </div>
            </div>
        </div>
    )
}