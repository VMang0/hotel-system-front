import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import "./EditManager.css"
import {HiOutlineArrowLeft} from "react-icons/hi";
import {toast} from "react-toastify";

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
        toast.success('Вы успешно изменили данные менеджера!');
        navigate("/admin/dashboard-manager");
    };

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`);
        const userRoles = result.data.roles.join(',');
        setUser({ ...result.data, roles: userRoles });
    };

    return (
        <div>
            <div className="name-page"><span>Редактирование менеджера</span></div>
            <div className= "container-edit-manager">
                <div className= "container-edit-manager-window">
                    <div className="form-for-cancel">
                        <button className= "btn-cancel-add-manager" onClick={()=> navigate("/admin/dashboard-manager")}><HiOutlineArrowLeft/></button>
                    </div>
                    <div className= "form-add">
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="input-login">
                                <input type= "email"
                                       className= "form_login"
                                       placeholder="Email"
                                       name = "email"
                                       value={email}
                                       onChange={(e)=> onInputChange(e)}
                                       required/>
                                <label className="label-input">Email</label>
                            </div>
                            <div className="select-form">
                                <select className="select-form-child" name="roles" value={roles} onChange={(e) => onInputChange(e)}>
                                    <option value="USER">User</option>
                                    <option value="MANAGER">Manager</option>
                                </select>
                            </div>
                            <button type="submit" className= "btn-add-manager">Изменить</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}