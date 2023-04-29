import {useEffect, useState} from "react";
import React from "react";
import axios from "axios";
import "./Calls.css"
import {MdDelete} from "react-icons/md";
import {toast} from "react-toastify";
import BackFon from "../../admin/control_managers/backfon/BackFon";
export default function Calls(){

    const [calls, setCalls] = useState([]);
    const [status, setStatus] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showBackFon, setShowBackFon] = useState(false);
    const [selectRquest, setSelectRequest] = useState(null);

    useEffect(() =>{
        loadCalls();
        loadStatus();
    }, []);

    const loadCalls = async () => {
        const result = await axios.get("http://localhost:8080/call_request/list");
        setCalls(result.data);
    };

    const loadStatus = async () => {
        const result = await axios.get("http://localhost:8080/call_request/status/list");
        setStatus(result.data);
    };

    function handleStatusChange(event) {
        onSubmit(event.target.dataset.id, event.target.value);
    }

    const onSubmit = async (id, name) => {
        await axios.put(`http://localhost:8080/call_request/${id}/${name}`);
        toast.success('Статус звонка успешно изменён!');
        loadCalls();
    };

    const deleteReservation = async (id) => {
        setSelectRequest(id);
        setShowModal(true);
        setShowBackFon(true);
    };

    const handleConfirmDelete = async () => {
        await axios.delete(`http://localhost:8080/call_request/${selectRquest}`);
        setSelectRequest(null);
        setShowModal(false);
        setShowBackFon(false);
        loadCalls();
    };

    const handleCancelDelete = () => {
        setSelectRequest(null);
        setShowModal(false);
        setShowBackFon(false);
    };

    return(
        <div className="container-call-request">
            {showBackFon && <BackFon show={showBackFon} clicked={handleCancelDelete}></BackFon>}
            <div className="name-page"><span>Запросы на звонок</span></div>
            <div className="form-for-table-calls">
                <div className="table-request-call">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Номер</th>
                            <th scope="col">Статус</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            calls.map((calls, index) => (
                                <tr key = {index}>
                                    <td scope="row" ><p className="number">{index + 1}</p></td>
                                    <td><p className="table_text">{calls.phoneNumber}</p></td>
                                    <td>
                                        <select name="status" className="status-select" onChange={handleStatusChange} data-id={calls.id}>
                                            <option  value={calls.callStatus.name}>{calls.callStatus.name}</option>
                                            {
                                                status.map(status => {
                                                    if(status.name !== calls.callStatus.name){
                                                        return(
                                                            <option key={status.id} value={status.name}>{status.name}</option>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            }
                                        </select>
                                    </td>
                                    <td>
                                        {
                                            calls.callStatus.name === "Отклонен" || calls.callStatus.name === "Завершен" ?(

                                                <button className= "btn-request-table delete-request" onClick={() => deleteReservation(calls.id)}><MdDelete/></button>

                                            ) : ""
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && (
                <div className="modal_window">
                    <div className="modal_main">
                        <p className="question">Вы уверены, что хотите удалить запись?</p>
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