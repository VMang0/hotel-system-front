import React, {useEffect, useState} from 'react'
import axios from "axios";
import BackFon from "./backfon/BackFon";
import useTable from "../table/useTable";
import TableFooter from "../table/TableFooter";

export default function ControlUsers() {
    const [users, setUsers] = useState([])

    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showBackFon, setShowBackFon] = useState(false);


    const [page, setPage] = useState(1);
    const { slice, range } = useTable(users, page, 8);

    useEffect(()=>{
        loadUsers();
    }, [])

    const loadUsers = async ()=>{
        const result = await axios.get("http://localhost:8080/userlist");
        setUsers(result.data);
    }

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

    return (
        <div className= "container_admin">
            {showBackFon && <BackFon show={showBackFon} clicked={handleCancelDelete}></BackFon>}
            <div className= "admin_table">
                <div className="cont_table">
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
                            slice.map((user, index) => (
                                <tr key = {index}>
                                    <td scope="row" ><p className="number">{index + 1}</p></td>
                                    <td><p className="table_text">{user.email}</p></td>
                                    <td><p className="table_text">{user.roles[0]}</p></td>
                                    <td>
                                    <button className= "btn btn-danger mx-2" onClick={()=> deleteUser(user.id)}>Delete</button>
                                </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
                <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
            </div>
            {showModal && (
                <div className="modal_window">
                    <div className="modal_main">
                        <p className="question">Вы уверены, что хотите удалить данного пользователя?</p>
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
    )
}