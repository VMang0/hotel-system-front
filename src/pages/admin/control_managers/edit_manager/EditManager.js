import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import "./EditManager.css"

export default function EditManager() {
    let navigate = useNavigate();

    const { id } = useParams();

    const [user, setUser] = useState({
        email: "",
        roles: [],
    });

    const { email , roles} = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUser();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/user/${id}`, {...user, roles: [user.roles]});
        navigate("/admin/dashboard-manager");
    };

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`);
        const userRoles = result.data.roles.join(',');
        setUser({ ...result.data, roles: userRoles });
    };

    return (
        <div className= "container-edit-manager">
            <div className= "container-edit-manager-window">
                <div className= "form-edit">
                    <h3 className= "text-center m-3 ">Edit User</h3>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="input-container">
                            <input type= "email" className= "form-control" placeholder="Email" name = "email"
                                   value={email} onChange={(e)=> onInputChange(e)} required/>
                            <label className="form-label">Email</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Role" className="form-label"> Role </label>
                            <select className="form-select" name="roles" value={roles} onChange={(e) => onInputChange(e)}>
                                <option value="USER">User</option>
                                <option value="MANAGER">Manager</option>
                            </select>
                        </div>
                        <button type="submit" className= "btn btn-outline-primary">Submit</button>
                        <Link  className= "btn btn-danger mx-2" to = "/admin/dashboard-manager">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}