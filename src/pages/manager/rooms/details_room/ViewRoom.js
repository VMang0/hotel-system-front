import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
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
export default function ViewRoom(){
    const [room, setRoom] =useState({
        number: "",
        cost: "",
        type_room: "",
        type_bed: "",
        square: "",
        description: "",
    });
    const [images, setImages] = useState([]);
    const { id } = useParams();
    const[type_meals, setTypeMeals] = useState([]);

    let currentDate = new Date();
    let today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 2);
    let tomorrow = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 3);

    const [initialCost, setInitialCost] = useState(0);
    const [adultsCount, setAdultsCount] = useState(1);
    const [childrenCount, setChildrenCount] = useState(0);
    const [mealCost, setMealCost] = useState(0);
    const [totalCost, setTotalCost] = useState(initialCost);
    const [selectedMealName, setSelectedMealName] = useState('');
    const [startDate, setStartDate] = useState(today.toISOString().slice(0,10));
    const [endDate, setEndDate] = useState(tomorrow.toISOString().slice(0,10));

    useEffect(()=> {
        loadRoom();
        const fetchImages = async ()=>{
          const result = await axios(`http://localhost:8080/image/${id}`);
          setImages(result.data)
        };
        fetchImages();

        axios.get('http://localhost:8080/list/type_meals')
            .then(response =>{
                setTypeMeals(response.data);
            })
            .catch(error =>{
                console.log(error);
            });

    }, []);

    const loadRoom = async () => {
        const result = await axios.get(`http://localhost:8080/room/${id}`);
        setRoom(result.data);
        setInitialCost(result.data.cost);
    };

    useEffect(() => {
        const selectedMeal = type_meals.find(meal => meal.name === selectedMealName);
        if (selectedMeal) {
            setMealCost(selectedMeal.cost);
        }
        const between = calculatebetweenDays(startDate, endDate);
        const newTotalCost = (initialCost * (adultsCount + 0.5 * childrenCount)) + mealCost * (adultsCount + 0.5 * childrenCount);
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

    return (
        <div className= "container-view-room">
            <div className= "">
                <div className= "">
                    <div className="name-room-details">{room.name}</div>
                    <div className="form-img-and-request">
                       {/* <div className="container-for-images">
                            {images.length > 0 ? (
                                images.map((image) =>(
                                    <img key={image.id} src={`data:image/jpeg;base64,${image.bytes}`} alt=""/>
                                ))
                            ): (
                                <img  className="image" src={noFoto} alt="room" />
                            )
                            }
                        </div>*/}
                        <div className="container-for-images">
                            {images.length > 0 ? (
                                <Slider>
                                    {images.map((image) => (
                                        <img className="n_images" key={image.id} src={`data:image/jpeg;base64,${image.bytes}`} alt="" loading="lazy"/>
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
                                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} aria-label = "start data" min={today.toISOString().slice(0,10)}/>
                                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} aria-label = "end data" min={tomorrow.toISOString().slice(0,10)}/>
                                </div>
                                <div className="main-forms-counters">
                                    <div className="form-counter">
                                        <div className="person-name"><span>Взрослые:</span></div>
                                        <div className="counter">
                                            <button className="button-counter" onClick={() => handleAdultsCountChange({ target: { value: adultsCount - 1 } })}>-</button>
                                            <input type="number" className="input-counter" value={adultsCount} onChange={handleAdultsCountChange} readOnly aria-label = "number adult" min="1" max="10"/>
                                            <button className="button-counter" onClick={() => handleAdultsCountChange({ target: { value: adultsCount + 1 } })}>+</button>
                                        </div>
                                    </div>
                                    <div className="form-counter">
                                        <div className="person-name"><span>Дети (до 3-ёх лет):</span></div>
                                        <div className="counter">
                                            <button className="button-counter" onClick={() => handleChildrenCountChange({ target: { value: childrenCount - 1 } })}>-</button>
                                            <input  type="number" className="input-counter" value={childrenCount} onChange={handleChildrenCountChange} readOnly aria-label = "number child"/>
                                            <button className="button-counter" onClick={() => handleChildrenCountChange({ target: { value: childrenCount + 1 } })}>+</button>
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
                                        <span>Стоимость: </span>
                                        <span style={{color: "#fff"}}>{totalCost} руб.</span>
                                    </div>
                                    <div className="container-button-request"><button className="btn-request">Забронировать</button></div>
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
                </div>
            </div>
        </div>
    );
}



