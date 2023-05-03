import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../contexts/authContext";
import "./PersonalRequests.css";
import "./Card.css"
import BackFon from "../../admin/control_managers/backfon/BackFon";
import {toast} from "react-toastify";
export default function PersonalRequests(){
    const {authData} = useContext(AuthContext);
    const [reservations, setReservations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalPay, setShowModalPay] = useState(false);
    const [selectedReservation, setselectedReservation] = useState(null);
    const [showBackFon, setShowBackFon] = useState(false);

    const [cardNumber, setCardNumber] = useState('');
    const [cardNumber2, setCardNumber2] = useState('');
    const [cardMonth, setCardMonth] = useState('');
    const [cardYear, setCardYear] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardLastName, setCardLastName] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [isFlipped, setIsFlipped] = useState(false);

    const LoadRequests = async() =>{
        await axios.get(`http://localhost:8080/reservations/user/${authData.id}`)
            .then(response =>{
                setReservations(response.data)
            })
            .catch(error =>{
                console.log(error)
            });
    };

    useEffect(()=>{
        LoadRequests();
    }, []);

    const handleCardNumberChange = (event) => {
        setCardNumber(event.target.value);
        setIsFlipped(false);
        if (event.target.value.length === 16) {
            document.getElementById('card-name-input').focus();
        }
    };

    const handleCardNameChange = (event) => {
        setCardName(event.target.value);
        setIsFlipped(false);
        if (event.target.value.length === 15) {
            document.getElementById('card-lastname-input').focus();
        }
    };

    const handleCardLastNameChange = (event) => {
        setCardLastName(event.target.value);
        setIsFlipped(false);
        if (event.target.value.length === 15) {
            setIsFlipped(true);
            document.getElementById('card-month-input').focus();
        }
    };

    const handleCardMonthChange = (event) => {
        setCardMonth(event.target.value);
        setIsFlipped(false);
        if (event.target.value.length === 2) {
            document.getElementById('card-year-input').focus();
        }
    };

    const handleCardYearChange = (event) => {
        setCardYear(event.target.value);
        setIsFlipped(false);
        if (event.target.value.length === 2) {
            document.getElementById('card-cvv-input').focus();
        }
    };

    const handleCardCvvChange = (event) => {
        setCardCvv(event.target.value);
        setIsFlipped(true);
        if (event.target.value.length === 3) {
            setIsFlipped(false);
            document.getElementById('card-number-input').focus();
        }
    };

    const CanselReservation = async (id) => {
        setselectedReservation(id);
        setShowModal(true);
        setShowBackFon(true);
    };

    const handleConfirmCancel = async () => {
        await axios.put(`http://localhost:8080/personalreserv/${selectedReservation}`);
        setselectedReservation(null);
        setShowModal(false);
        setShowBackFon(false);
        LoadRequests();
    };

    const handleCancel = () => {
        setselectedReservation(null);
        setShowModal(false);
        setShowModalPay(false);
        setShowBackFon(false);
    };


    const PayReservation = async (id) => {
        setselectedReservation(id);
        setShowModalPay(true);
        setShowBackFon(true);
    };

    const handleConfirmPay = async () => {
        const cardData = {
            number: cardNumber,
            month: cardMonth,
            year: cardYear,
            name: cardName,
            lastname: cardLastName,
            cvv: cardCvv
        };
        axios.post(`http://localhost:8080/personalreserv/${selectedReservation}`, cardData)
            .then(response =>{
                setselectedReservation(null);
                setShowModalPay(false);
                setShowBackFon(false);
                toast.success('Оплата прошла успешно. Бронь потверждена!');
                LoadRequests();
            })
            .catch(error =>{
                console.log(error);
                toast.error('Оплата не совершена. Попробуйте снова позже!');
            });

        LoadRequests();
    };

    useEffect(()=>{
        const formattedCardNumber =cardNumber.replace(/(\d{4})/g, '$1 '); // Добавляем пробел после каждой группы из 4 цифр
        setCardNumber2(formattedCardNumber);
    }, [cardNumber]);

    return(
        <div className="main-form-table">
            {showBackFon && <BackFon show={showBackFon} clicked={handleCancel}></BackFon>}
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Номер</th>
                            <th scope="col">Дата заезда</th>
                            <th scope="col">Дата выезда</th>
                            <th scope="col">Взрослые</th>
                            <th scope="col">Дети</th>
                            <th scope="col">Питание</th>
                            <th scope="col">Стоимость</th>
                            <th scope="col">Вид оплаты</th>
                            <th scope="col">Дата брони</th>
                            <th scope="col">Статус</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        reservations.map((reservations, index)=>(
                            <tr key={index}>
                                <td><p className="number" style={{width: "50px"}}>{index + 1}</p></td>
                                <td><p className="table_text" style={{width: "200px"}}>{reservations.nameRoom}</p></td>
                                <td><p className="table_text" style={{width: "150px"}}>{reservations.startdate}</p></td>
                                <td><p className="table_text" style={{width: "150px"}}>{reservations.enddate}</p></td>
                                <td><p className="table_text" style={{width: "50px"}}>{reservations.numAdult}</p></td>
                                <td><p className="table_text" style={{width: "50px"}}>{reservations.numChild}</p></td>
                                <td><p className="table_text" style={{width: "150px"}}>{reservations.type_meal}</p></td>
                                <td><p className="table_text" style={{width: "100px"}}>{reservations.cost}</p></td>
                                <td><p className="table_text" style={{width: "100px"}}>{reservations.payment}</p></td>
                                <td><p className="table_text" style={{width: "150px"}}>{reservations.reservdate}</p></td>
                                <td><p className="table_text" style={{width: "130px"}}>{reservations.status}</p></td>
                                {
                                    (reservations.payment === "Безналичный" || reservations.payment === "Наличные") && reservations.status === "Ожидает оплаты" ? (
                                        <td><button className="btn-request-table-user btn-cancel-request" onClick={() => CanselReservation(reservations.id)}>Отменить</button></td>
                                    ) : ""
                                }
                                {
                                    reservations.payment === "Безналичный" && reservations.status === "Ожидает оплаты" ? (
                                        <td ><button className="btn-request-table-user btn-pay-request" onClick={()=> PayReservation(reservations.id)}>Оплатить</button></td>
                                    ) : ""
                                }
                            </tr>
                        ))
                    }
                    </tbody>
                </table>

            {showModal && (
                <div className="modal_window">
                    <div className="modal_main">
                        <p className="question">Вы уверены, что хотите отменить бронь?</p>
                        <div className="modal_buttons">
                            <button className="btn btn-secondary" onClick={handleCancel}>
                                Назад
                            </button>
                            <button className="btn btn-danger" onClick={handleConfirmCancel}>
                                Отменить
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showModalPay && (
                    <div className="modal-window-reservation">
                        <div className="modal-main-reservation">
                            <div className="form-for-btn-cancel">
                                <button className="btn-cancel" onClick={handleCancel}>X</button>
                            </div>
                            <div className="card-form">
                                <div className={`card ${isFlipped ? 'flipped' : ''}`}>
                                    <div className="card-front">
                                        <div className="card-user">
                                            <div className="card-name">
                                                <input
                                                    type="text"
                                                    maxLength="20"
                                                    value={cardName}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="card-lastname">
                                                <input
                                                    type="text"
                                                    maxLength="25"
                                                    value={cardLastName}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="gold-text highlight">
                                            <input
                                                type="text"
                                                maxLength="16"
                                                value={cardNumber2}
                                                readOnly
                                            />
                                        </div>
                                        <div className="card-date">
                                            <div className="card-date-form">
                                                <div className="card-month">
                                                    <input
                                                        type="number"
                                                        maxLength="2"
                                                        value={cardMonth}
                                                        readOnly
                                                    />
                                                </div>
                                                <span>/</span>
                                                <div className="card-year">
                                                    <input
                                                        type="number"
                                                        maxLength="2"
                                                        value={cardYear}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-back">
                                        <div className="card-cvv">
                                            <input
                                                type="number"
                                                maxLength="3"
                                                value={cardCvv}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-fields">
                                    <div className="form-fields-number">
                                        <div className="text-card"><label htmlFor="card-number-input">Card Number</label></div>
                                        <input
                                            type="number"
                                            id="card-number-input"
                                            maxLength="16"
                                            value={cardNumber}
                                            onChange={handleCardNumberChange}
                                        />
                                    </div>
                                    <div className="form-fields-name">
                                        <div className="text-card"><label htmlFor="card-name-input">Cardholder Name</label></div>
                                        <input
                                            type="text"
                                            id="card-name-input"
                                            maxLength="20"
                                            value={cardName}
                                            onChange={handleCardNameChange}
                                        />
                                    </div>
                                    <div className="form-fields-lastname">
                                        <div className="text-card"><label htmlFor="card-lastname-input">Cardholder LastName</label></div>
                                        <input
                                            type="text"
                                            id="card-lastname-input"
                                            maxLength="25"
                                            value={cardLastName}
                                            onChange={handleCardLastNameChange}
                                        />
                                    </div>
                                    <div className="form-card-date-cvv">
                                        <div>
                                            <label htmlFor="card-month-input">Month</label>
                                            <input
                                                type="number"
                                                id="card-month-input"
                                                maxLength="2"
                                                value={cardMonth}
                                                onChange={handleCardMonthChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="card-year-input">Year</label>
                                            <input
                                                type="number"
                                                id="card-year-input"
                                                maxLength="2"
                                                value={cardYear}
                                                onChange={handleCardYearChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="card-cvv-input">CVV</label>
                                            <input
                                                type="number"
                                                id="card-cvv-input"
                                                maxLength="3"
                                                value={cardCvv}
                                                onChange={handleCardCvvChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="btn-card-pay" onClick={handleConfirmPay}>Оплатить</button>
                            </div>
                        </div>
                    </div>
            )}
        </div>
    )
}
