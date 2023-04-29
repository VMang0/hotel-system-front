import React, {useEffect, useState} from 'react'
import axios from "axios";
import "./Request.css"
import BackFon from "../../admin/control_managers/backfon/BackFon";
import {toast} from "react-toastify";
import {HiDocumentText} from "react-icons/hi2";
import {MdDelete} from "react-icons/md"

export default function Requests() {

    const [reservations, setReservations] = useState([]);
    const [status, setStatus] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showBackFon, setShowBackFon] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const loadreserv = async ()=> {
        axios.get("http://localhost:8080/list/reservations")
            .then(response => {
                setReservations(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }


    useEffect(()=>{
        loadreserv();
    }, [])

    useEffect(()=>{
        axios.get("http://localhost:8080/list/status")
            .then(response =>{
                setStatus(response.data);
            })
            .catch(error =>{
                console.log(error);
            });
    }, [])

    const deleteReservation = async (id) => {
        setSelectedReservation(id);
        setShowModal(true);
        setShowBackFon(true);
    };

    const handleConfirmDelete = async () => {
        await axios.delete(`http://localhost:8080/reservation/${selectedReservation}`);
        setSelectedReservation(null);
        setShowModal(false);
        setShowBackFon(false);
        loadreserv();
    };

    const handleCancelDelete = () => {
        setSelectedReservation(null);
        setShowModal(false);
        setShowBackFon(false);
    };
    function handleStatusChange(event) {
        onSubmit(event.target.dataset.id, event.target.value);
    }

    const onSubmit = async (id, name) => {
        await axios.put(`http://localhost:8080/reservation/${id}/${name}`);
        toast.success('Статус бронирования успешно изменён!');
        loadreserv();
    };

    const handleCreateContract = async (id) => {
        axios.get(`http://localhost:8080/contracts/${id}`)
            .then(response =>{
                if(response.status === 200){
                    toast.success('Договор создан!');
                }else{
                    toast.error('Произошла ошибка при создании договор. Повторите попытку позже!');
                }

            })
            .catch(error =>{
                console.log(error);
            });
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredReservations = reservations.filter((reservation) =>{
        return (
            reservation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            reservation.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            reservation.patronymic.toLowerCase().includes(searchQuery.toLowerCase()) ||
            reservation.room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            reservation.status.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            reservation.payment.toLowerCase().includes(searchQuery.toLowerCase()) ||
            reservation.type_meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            reservation.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const [path, setPath] = useState('')

    console.log(path);
    return (
        <div className= "container_manager" style={{ minHeight: '100vh' }}>
            {showBackFon && <BackFon show={showBackFon} clicked={handleCancelDelete}></BackFon>}
            <div className="name-page"><span>Заявки на бронирование</span></div>
            <div className= "manager_table">
                <div className="form-for-input-search">
                    <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Поиск..."/>
                </div>
                <div className="request_table">
                        <table className="table border shadow">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Имя</th>
                                <th scope="col">Фамилия</th>
                                <th scope="col">Отчество</th>
                                <th scope="col">Телефон</th>
                                <th scope="col">Номер</th>
                                <th scope="col">Заезд</th>
                                <th scope="col">Выезд</th>
                                <th scope="col">Оплата</th>
                                <th scope="col">Взрослые</th>
                                <th scope="col">Дети</th>
                                <th scope="col">Питание</th>
                                <th scope="col">Стоимость</th>
                                <th scope="col" >Резерв</th>
                                <th scope="col">Статус</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                filteredReservations.map((reservations, index) => (
                                    <tr key = {index}>
                                        <td><p className="number">{index + 1}</p></td>
                                        <td><p className="table_text" style={{width: "130px"}}>{reservations.name}</p></td>
                                        <td><p className="table_text" style={{width: "130px"}}>{reservations.lastname}</p></td>
                                        <td><p className="table_text" style={{width: "130px"}}>{reservations.patronymic}</p></td>
                                        <td><p className="table_text" >{reservations.phoneNumber}</p></td>
                                        <td><p className="table_text" style={{width: "300px"}}>{reservations.room.name}</p></td>
                                        <td><p className="table_text" style={{width: "100px"}}>{reservations.startdate}</p></td>
                                        <td><p className="table_text" style={{width: "100px"}}>{reservations.enddate}</p></td>
                                        <td><p className="table_text">{reservations.payment}</p></td>
                                        <td><p className="table_text">{reservations.numAdult}</p></td>
                                        <td><p className="table_text">{reservations.numChild}</p></td>
                                        <td><p className="table_text" style={{width: "100px"}}>{reservations.type_meal.name}</p></td>
                                        <td><p className="table_text">{reservations.cost}</p></td>
                                        <td><p className="table_text" style={{width: "100px"}}>{reservations.reservdate}</p></td>
                                        <td>
                                            <select name="status" className="status-select" onChange={handleStatusChange} data-id={reservations.id}>
                                                <option  value={reservations.status.name}>{reservations.status.name}</option>
                                                {
                                                    status.map(status => {
                                                        if (status.name !== reservations.status.name){
                                                           return( <option key={status.id_status}
                                                                    value={status.name}>{status.name}</option>);
                                                        }
                                                        return null;
                                                    })
                                                }
                                            </select>
                                        </td>
                                        {
                                            reservations.status.name === "Аннулирована" || reservations.status.name === "Завершена" ? (
                                                <td>
                                                    <button className= "btn-request-table delete-request" onClick={()=> deleteReservation(reservations.id)}><MdDelete/></button>
                                                </td>
                                            ) :  reservations.status.name === "Потверждена" ? (
                                                        <td>
                                                            <button className= "btn-request-table dogovor-request" onClick={()=> handleCreateContract(reservations.id)}><HiDocumentText/></button>
                                                        </td>
                                            ) : ""
                                        }
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