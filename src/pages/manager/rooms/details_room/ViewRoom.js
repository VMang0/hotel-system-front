import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import "./ViewRoom.css"
import {SlPeople} from "react-icons/sl";
import {IoBedOutline} from "react-icons/io5";
import {BiArea} from "react-icons/bi";
import noFoto from "../../../../css_all/img/nophoto.png";
export default function ViewRoom(){
    const [room, setRoom] =useState({
        number: "",
        cost: "",
        type_room: "",
        type_bed: "",
    });
    const [images, setImages] = useState([]);
    const { id } = useParams();
    const [count, setCount] = useState(1);
    const [count_child, setCount_child] = useState(0);
    const[type_meals, setTypeMeals] = useState([]);

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
    };

    function increment(){
        setCount(count + 1);
    }
    function decrement(){
        setCount(count - 1);
    }
    function increment_child(){
        setCount_child(count_child + 1);
    }
    function decrement_child(){
        setCount_child(count_child - 1);
    }
    return (
        <div className= "container-view-room">
            <div className= "">
                <div className= "">
                    <div className="name-room-details">{room.name}</div>
                    <div className="form-img-and-request">
                        <div className="container-for-images">
                            {images.length > 0 ? (
                                images.map((image) =>(
                                    <img key={image.id} src={`data:image/jpeg;base64,${image.bytes}`} alt=""/>
                                ))
                            ): (
                                <img className="image" src={noFoto} alt="room" />
                            )
                            }
                        </div>
                        <div className="container-for-request">
                            <div>
                                <div className="header-request"><span>Забронировать номер</span></div>
                                <div className="calendars">
                                    <input type="date"/>
                                    <input type="date"/>
                                </div>
                                <div className="main-forms-counters">
                                    <div className="form-counter">
                                        <div className="person-name"><span>Взрослые:</span></div>
                                        <div className="counter">
                                            <button className="button-counter" onClick={decrement}>-</button>
                                            <input type="number" className="input-counter" value={count} min="1" max={room.number}/>
                                            <button className="button-counter" onClick={increment}>+</button>
                                        </div>
                                    </div>
                                    <div className="form-counter">
                                        <div className="person-name"><span>Дети:</span></div>
                                        <div className="counter">
                                            <button className="button-counter" onClick={decrement_child}>-</button>
                                            <input  type="number" className="input-counter" value={count_child} min={1} max={room.number}/>
                                            <button className="button-counter" onClick={increment_child}>+</button>
                                        </div>
                                    </div>
                                    <div className="form-for-meals">
                                        <select name="type_meals" className="select_meals">
                                            <option value="" disabled>Choose an option</option>
                                            {
                                                type_meals.map(type_meals =>(
                                                    <option key={type_meals.id} value={type_meals.name}>{type_meals.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="form-for-clean">
                                        <span>Уборка: </span>
                                        <input className="checkbox_clean" type="checkbox"/>
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
                            </div>
                        </div>
                        <div className="description">{room.description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}



