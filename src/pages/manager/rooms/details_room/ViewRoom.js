import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "./ViewRoom.css"
import {SlPeople} from "react-icons/sl";
import {IoBedOutline} from "react-icons/io5";
import {BiArea} from "react-icons/bi";
import {RxStar} from "react-icons/rx"
import noFoto from "../../../../css_all/img/nophoto.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {AuthContext} from "../../../../contexts/authContext";
import BackFon from "../../../admin/control_managers/backfon/BackFon";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {HiMinus, HiPlus} from "react-icons/hi";
import {toast} from "react-toastify";

export default function ViewRoom(){
    const [room, setRoom] =useState({
        number: "",
        cost: "",
        type_room: "",
        type_bed: "",
        square: "",
        description: "",
    });

    const[reservation, setReservation] = useState({
        user: "",
        name: "",
        lastname: "",
        patronymic: "",
        phoneNumber: "",
        birthDate: "",
        payment: "",
        startdate: "",
        enddate: "",
        reservdate: "",
        type_meal: "",
        numAdult: "",
        numChild: "",
        room: "",
        cost: ""
    });

    let {name, lastname, patronymic, phoneNumber, birthDate, payment} = reservation;
    const {authData} = useContext(AuthContext);
    const [images, setImages] = useState([]);
    const { id } = useParams();
    const[type_meals, setTypeMeals] = useState([]);
    const [reservDate, setreservDate] = useState([]);

    let currentDate = new Date();
    let formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Minsk',
    });
    formatter.format(currentDate);
    let today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
    let dateReserv = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours() + 3, currentDate.getMinutes(), currentDate.getSeconds());
    let tomorrow = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 2);
    let maxYear = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate() + 1)

    const [initialCost, setInitialCost] = useState(0);
    const [adultsCount, setAdultsCount] = useState(1);
    const [childrenCount, setChildrenCount] = useState(0);
    const [mealCost, setMealCost] = useState(0);
    const [totalCost, setTotalCost] = useState(initialCost);
    const [selectedMealName, setSelectedMealName] = useState('');

    const [startDate, setStartDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    const [endDate, setEndDate] = useState(new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()));
    const [showModal, setShowModal] = useState(false);
    const [showBackFon, setShowBackFon] = useState(false);
    const [showModalInfo, setShowModalInf0] = useState(false);
    const [is18, setIs18] = useState(false);
    const navigate = useNavigate();


    useEffect(()=>{
        axios.get('http://localhost:8080/list/type_meals')
            .then(response =>{
                setTypeMeals(response.data);
            })
            .catch(error =>{
                console.log(error);
            });
    }, []);

    useEffect(()=> {
        axios.get(`http://localhost:8080/room/${id}`)
            .then(response =>{
                setRoom(response.data);
                setInitialCost(response.data.cost);
            })
            .catch(error =>{
                console.log(error);
            });

        axios.get(`http://localhost:8080/image/${id}`)
            .then(response =>{
                setImages(response.data)
            })
            .catch(error =>{
                console.log(error);
            });

        axios.get(`http://localhost:8080/reservations/dates/${id}`)
            .then(response =>{
                setreservDate(response.data);
            })
            .catch(error =>{
                console.log(error);
            });


    }, [id]);

    useEffect(() => {
        const selectedMeal = type_meals.find(meal => meal.name === selectedMealName);
        if (selectedMeal) {
            setMealCost(selectedMeal.cost);
        }
        const between = calculatebetweenDays(startDate, endDate);
        const newTotalCost = (initialCost * (adultsCount + 0.5 * childrenCount)) + mealCost * adultsCount;
        if(isNaN(between)){
            setTotalCost(newTotalCost);
        }else{
            setTotalCost(newTotalCost * between);
        }

    }, [initialCost, adultsCount, childrenCount, mealCost, selectedMealName, type_meals, startDate, endDate]);


    function handleAdultsCountChange(event) {
        let value = parseInt(event.target.value);
        if(value < 1){
            value = 1;
        }else if(value > room.number){
            value = room.number;
        }
        setAdultsCount(value);
    }
    function handleChildrenCountChange(event) {
        let value = parseInt(event.target.value);
        if(value < 0){
            value = 0;
        }else if(value > 2){
            value = 2;
        }
        setChildrenCount(value);
    }
    function handleMealChange(event) {
        setSelectedMealName(event.target.value);
    }
    function calculatebetweenDays(startDate, endDate){
        if(startDate === null || endDate === null){
            return null;
        }
        const oneDay = 1000 * 60 * 60 * 24;
        const parseStartDate = Date.parse(startDate);
        const parseEndDate = Date.parse(endDate);
        const difference = Math.abs(parseEndDate - parseStartDate);
        return Math.round(difference/oneDay);
    }

    const OpenForm = async () => {
        if(startDate < endDate){
            setShowModal(true);
            setShowBackFon(true);
            document.body.style.overflow = 'hidden';
        }else{
            toast.error('Проверьте корректность введённых дат для бронирования!');
        }

    };

    const handleCancel = () => {
        setShowModal(false);
        setShowBackFon(false);
        setShowModalInf0(false);
        document.body.style.overflow = 'auto';
    };

    const  canselInfo = () => {
        setShowModal(false);
        setShowModalInf0(false)
        navigate("/");
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        const today = new Date(maxYear);
        const dateOfBirth = new Date(birthDate);
        const ageDiffMs = dateOfBirth.getTime() - today.getTime();
        if(ageDiffMs <= 0){
            setIs18(true)
        }else{
            setIs18(false)
        }
    }, [birthDate]);


    const handleReservationSubmit = async (e) => {
        e.preventDefault();
        let meals = "";
        if(selectedMealName === "Без питания" || selectedMealName === ""){
            meals = "Без питания";
        }else{
            meals = selectedMealName;
        }

        if(payment === ""){
            payment = "Безналичный";
        }

        const start = (startDate.getFullYear() + '-' + ('0' + (startDate.getMonth() + 1)).slice(-2) + '-' + ('0' + startDate.getDate()).slice(-2));
        const end = (endDate.getFullYear() + '-' + ('0' + (endDate.getMonth() + 1)).slice(-2) + '-' + ('0' + endDate.getDate()).slice(-2));
        const reservationData = {
            user: authData.id,
            name,
            lastname,
            patronymic,
            phoneNumber,
            birthDate,
            payment,
            startdate: start,
            enddate: end,
            reservdate: dateReserv,
            type_meal: meals,
            numAdult: adultsCount,
            numChild: childrenCount,
            room: room.id,
            cost: totalCost,
        };
        e.preventDefault();
        try {
            if(is18 === true){
                await axios.post("http://localhost:8080/add_reservation", reservationData)
                setShowModalInf0(true);
            }else if (is18 === false){
                toast.error('Бронь могут осуществлять только лица достигшие 18-ти лет!');
            }else {
                toast.error('Проверьте корректность введённых дат для бронирования!');
            }

        }catch (error){
            alert('Ошибка');
            console.error(error);
            document.body.style.overflow = 'auto';
        }
    };

    const onInputChange = (e)=>{setReservation({...reservation,[e.target.name]: e.target.value});};
    const handlePaymentChange = (e) => {
        const payment = e.target.value;
        setReservation({...reservation, payment: payment});
    }


    return (
        <div className= "container-view-room">
            {showBackFon && <BackFon show={showBackFon} clicked={handleCancel}></BackFon>}
                    <div className="name-room-details">{room.name}</div>
                    <div className="form-img-and-request">
                        <div className="container-for-images">
                            {images.length > 0 ? (
                                <Slider>
                                    {images.map((image, index) => (
                                        <img className="n_images" key={index + 1} src={`data:image/jpeg;base64,${image.bytes}`} alt="" loading="lazy"/>
                                    ))}
                                </Slider>
                            ) : (
                                <img className="image" src={noFoto} alt="room" loading="lazy" width="775px" height="500px"/>
                            )}
                        </div>
                        <div className="container-for-request">
                            <div>
                                <div className="header-request"><span>Забронировать номер</span></div>
                                <div className="calendars">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={date => {
                                            const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                                            if (reservDate.includes(dateStr)) {
                                                return;
                                            } else {
                                                setStartDate(date);
                                            }
                                        }}

                                        minDate={new Date(today)}
                                        aria-label="start date"
                                        className="minimal-datepicker"
                                        renderDayContents={(day, date) => {
                                            const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                                            if (reservDate.includes(dateStr)) {
                                                return <div style={{ backgroundColor: "rgba(255, 0 , 0 , 0.4)" }}>{day}</div>;
                                            } else {
                                                return <div>{day}</div>;
                                            }
                                        }}
                                    />
                                    <DatePicker
                                        selected={endDate}
                                        onChange={date => {
                                            const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                                            if (reservDate.includes(dateStr)) {
                                                return;
                                            } else {
                                                setEndDate(date);
                                            }
                                        }}
                                        minDate={new Date(tomorrow)}
                                        className="minimal-datepicker"
                                        aria-label = "end data"
                                        renderDayContents={(day, date) => {
                                            const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                                            if (reservDate.includes(dateStr)) {
                                                return <div style={{ backgroundColor: "rgba(255, 0 , 0 , 0.4)"}}>{day}</div>;
                                            } else {
                                                return <div>{day}</div>;
                                            }
                                        }}
                                    />
                                </div>
                                <div className="main-forms-counters">
                                    <div className="form-counter">
                                        <div className="person-name"><span>Взрослые:</span></div>
                                        <div className="counter">
                                            <button className="button-counter" onClick={() => handleAdultsCountChange({ target: { value: adultsCount - 1 } })}><HiMinus/></button>
                                            <input type="number" className="input-counter" value={adultsCount} onChange={handleAdultsCountChange} readOnly aria-label = "number adult" min="1" max="10"/>
                                            <button className="button-counter" onClick={() => handleAdultsCountChange({ target: { value: adultsCount + 1 } })}><HiPlus/></button>
                                        </div>
                                    </div>
                                    <div className="form-counter">
                                        <div className="person-name"><span>Дети (до 3-ёх лет):</span></div>
                                        <div className="counter">
                                            <button className="button-counter" onClick={() => handleChildrenCountChange({ target: { value: childrenCount - 1 } })}><HiMinus/></button>
                                            <input  type="number" className="input-counter" value={childrenCount} onChange={handleChildrenCountChange} readOnly aria-label = "number child"/>
                                            <button className="button-counter" onClick={() => handleChildrenCountChange({ target: { value: childrenCount + 1 } })}><HiPlus/></button>
                                        </div>
                                    </div>
                                    <div className="form-for-meals">
                                        <select name="type_meals" className="select_meals" onChange={handleMealChange}>
                                            {
                                                type_meals.map(type_meals =>(
                                                    <option key={type_meals.id} value={type_meals.name}>{type_meals.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="cost">
                                        <div className="cost-name"><span>Полная стоимость: </span></div>
                                        <div><span> {totalCost} бел. руб.</span></div>
                                    </div>
                                    {
                                        authData && authData.roles[0] === "USER" ?(
                                            <div className="container-button-request"><button className="btn-request" onClick={()=> OpenForm()}>Забронировать</button></div>
                                        ):(
                                            <div className="container-button-request"><button className="btn-request" disabled>Забронировать</button></div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-details-room-info">
                        <div className="header-details-room-info"><span>Информация о номере:</span></div>
                        <div className="details-room-info2">
                            <div className="details-room-info">
                                <div className="parts-of-details-info"><SlPeople className="icon-room-details"/><p>{room.number}</p></div>
                                <div className="parts-of-details-info"><IoBedOutline className="icon-room-details"/><p className="text-icon-bed">{room.type_bed}</p></div>
                                <div className="parts-of-details-info"><BiArea className="icon-room-details"/><p>{room.square} м²</p></div>
                                <div className="parts-of-details-info"><RxStar className="icon-room-details"/><p className="text-icon-bed">{room.type_room}</p></div>
                            </div>
                        </div>
                        <div className="description">{room.description}</div>
                    </div>

            {showModal && (
                <form onSubmit={(e) => handleReservationSubmit(e)}>
                    <div className="modal-window-reservation">
                        <div className="modal-main-reservation">
                            <div className="form-for-btn-cancel">
                                <div className="name-header-form">
                                    <span>Бронирование</span>
                                </div>
                                <button className="btn-cancel" onClick={handleCancel}>X</button>
                            </div>

                            <div className="input-form">
                                <div className="input-form-ones">
                                    <div className="input-form-ones-label" ><label>Имя</label></div>
                                    <input type="text" value={name} onChange={(e)=> onInputChange(e)} name="name" minLength="2" maxLength="20" required/>
                                </div>
                                <div className="input-form-ones">
                                    <div className="input-form-ones-label" ><label>Фамилия</label></div>
                                    <input type="text"  value={lastname} onChange={(e)=> onInputChange(e)} name="lastname" required />
                                </div>
                                <div className="input-form-ones">
                                    <div className="input-form-ones-label" ><label>Отчество</label></div>
                                    <input type="text"  value={patronymic} onChange={(e)=> onInputChange(e)} name="patronymic" />
                                </div>
                                <div className="input-form-ones">
                                    <div className="input-form-ones-label" ><label>Номер телефона</label></div>
                                    <input type="tel"  value={phoneNumber} onChange={(e)=> onInputChange(e)} name="phoneNumber" required />
                                </div>
                                <div className="input-form-ones">
                                    <div className="input-form-ones-label" ><label>Дата рождения</label></div>
                                    <input type="date" value={birthDate} onChange={(e)=> onInputChange(e)} name="birthDate" required />
                                </div>
                                <div className="input-form-ones">
                                    <div className="input-form-ones-label" ><label>Вид оплаты</label></div>
                                    <div className="input-form-pay">
                                        <div className="input-form-ones-pay">
                                            <label>Безналичный</label>
                                            <input type="radio" name="payment" value="Безналичный" onChange={(e)=> handlePaymentChange(e)} defaultChecked={true}/>
                                        </div>
                                        <div className="input-form-ones-pay">
                                            <label>Наличные</label>
                                            <input type="radio" name="payment" value="Наличные" onChange={(e)=> handlePaymentChange(e)}/>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn-request-form" type="submit">Забронировать</button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
            {showModalInfo && (
                    <div className="modal-window-reservation">
                        <div className="modal-main-reservation">
                            <div className="form-for-btn-cancel">
                                <div className="name-header-form">
                                    <span>Информация</span>
                                </div>
                            </div>
                            <div className="modal-form-info">
                                <span className="first-text-info">Вы успешно оформили бронь на номер!</span>
                                <span>В случае, если вы выбрали оплату безналичным платежом - просим вас перейти в ваш Личный кабинет, для оплаты брони.</span>
                                <span>Если же при выборе способа оплаты вы выбрали наличный вид платежа просим вас приехать и потвердить бронирование.</span>
                                <span>Предупреждаем! Без оплаты бронь будет действительна в течение 24 часов, далее она будет аннулирована.</span>
                                <span>Отменить бронирование мы можете также в своём Личном кабинете.</span>
                                <span className="last-text-info">С уважением, администрация отеля Vmang0!</span>
                            </div>
                            <button className="btn-request-form" onClick={()=> canselInfo()}>Понятно</button>
                        </div>
                    </div>
            )}
        </div>
    );
}



