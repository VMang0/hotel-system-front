import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import '../../../css_all/all.css'
import './Control.css'
import BackFon from "./backfon/BackFon";
import {IoPersonAddSharp} from 'react-icons/io5'

export default function ControlUsers() {
    const [users, setUsers] = useState([]);
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showBackFon, setShowBackFon] = useState(false);

    useEffect(()=>{
        loadUsers();
    }, [])

    const loadUsers = async ()=>{
        const result = await axios.get("http://localhost:8080/managerlist");
        setUsers(result.data);
    }

    /*const deleteUser = async (id) =>{
        await axios.delete(`http://localhost:8080/user/${id}`)

        loadUsers();
    }*/

    const deleteUser = async (id) => {
        setSelectedUser(id);
        setShowModal(true);
        setShowBackFon(true);
    };

    const handleConfirmDelete = async () => {
        await axios.delete(`http://localhost:8080/user/${selectedUser}`);
        setSelectedUser(null);
        setShowModal(false);
        setShowBackFon(false);
        loadUsers();
    };

    const handleCancelDelete = () => {
        setSelectedUser(null);
        setShowModal(false);
        setShowBackFon(false);
    };

    const NavAdd = () =>{
        navigate("/admin/dashboard-manager/add-manager");
    }

    return (
        <div>
        <div className= "container_admin">
            {showBackFon && <BackFon show={showBackFon} clicked={handleCancelDelete}></BackFon>}
            <div className="admin_table">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users.map((user, index) => (
                                <tr key = {index}>
                                    <td scope="row" ><p className="number">{index + 1}</p></td>
                                    <td><p className="table_text">{user.email}</p></td>
                                    <td><p className="table_text">{user.roles[0]}</p></td>
                                    <td>
                                        {/*<Link className= "btn btn-primary" to = {`/viewuser/${user.id}`}>View</Link>*/}
                                        <Link className= "btn btn-outline-primary" to={`/edituser/${user.id}`}>Edit</Link>
                                        <button className= "btn btn-danger" onClick={()=> deleteUser(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            {showModal && (
                    <div className="modal_window">
                        <div className="modal_main">
                            <p className="question">Вы уверены, что хотите удалить<br></br>данного менеджера?</p>
                            <div className="modal_buttons">
                                <button className="btn btn-secondary" onClick={handleCancelDelete}>
                                    Cancel
                                </button>
                                <button className="btn btn-danger" onClick={handleConfirmDelete}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
            )}
        </div>
        <div className="form_btn_add"><button className="btn_add" onClick={NavAdd}><IoPersonAddSharp className="icon_add"/></button></div>
        </div>
    )
}