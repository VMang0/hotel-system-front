import React, {useEffect, useState} from "react";
import axios from "axios";
import "./AllRooms.css"
import {Link, useParams} from "react-router-dom";
import {BiArea} from "react-icons/bi";
import {IoBedOutline} from "react-icons/io5";
import {SlPeople} from "react-icons/sl";
import noFoto from "../../../../css_all/img/nophoto.png"
export default function AllRooms(){

    const [rooms, setRoom] = useState([]);
    const [images, setImages] = useState([]);
    const [firstRoomImage, setFirstRoomImage] = useState({});
    const { id } = useParams();
    const LoadRooms = async ()=> {
        const result = await axios.get("http://localhost:8080/list/rooms");
        setRoom(result.data);
    }

    const fetchImages = async (id)=>{
        const result = await axios(`http://localhost:8080/image/${id}`);
        return result.data;
    };

    useEffect(()=>{
        LoadRooms();
    }, []);

    useEffect(() => {
        const updateFirstRoomImage = async () => {
            const firstImages = {};
            for (const room of rooms) {
                const images = await fetchImages(room.id);
                if (images.length > 0) {
                    firstImages[room.id] = `data:image/jpeg;base64,${images[0].bytes}`;
                }
            }
            setFirstRoomImage(firstImages);
        };

        updateFirstRoomImage();
    }, [rooms]);

    return(
        <div className="main-cards-container">
            <div className="name-page"><span>Номера и апартаменты</span></div>
            <div className="cards-container">
                <div className="cards-container2">
                {
                    rooms.map((room) =>(
                        <div className="room-card-grid" key={room.id}>
                            <div className="room-card">
                                <div className="image_container">
                                    {/*{firstRoomImage[room.id] && (
                                        <img className="image" src={firstRoomImage[room.id]} alt="room" />
                                    )}*/}
                                    {
                                        firstRoomImage[room.id] ? (
                                            <img className="image" src={firstRoomImage[room.id]} alt="room" />
                                        ):(
                                            <img className="image" src={noFoto} alt="room" />
                                        )
                                    }
                                    <div>

                                    </div>
                                </div>
                                <div className="card-room-info">
                                    <div className="name-room">{room.name}</div>
                                    <div className="info-container">
                                        <div className="parts-of-info"><SlPeople className="icon-room-card icon-people"/><p>{room.number}</p></div>
                                        <div className="parts-of-info"><IoBedOutline className="icon-room-card icon-bed"/><p className="text-type-bed">{room.type_bed}</p></div>
                                        <div className="parts-of-info"><BiArea className="icon-room-card icon-square"/><p>{room.square} м²</p></div>
                                    </div>
                                </div>
                                <div className="container-link-to-details-room">
                                    <Link className= "link-to-details-room" to={`/viewroom/${room.id}`}>Подробнее</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    );
}