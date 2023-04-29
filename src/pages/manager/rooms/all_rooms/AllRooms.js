import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import "./AllRooms.css"
import {Link} from "react-router-dom";
import {BiArea} from "react-icons/bi";
import {IoBedOutline} from "react-icons/io5";
import {SlPeople} from "react-icons/sl";
import noFoto from "../../../../css_all/img/nophoto.png";
import {MdDeleteOutline, MdOutlineEdit} from "react-icons/md";
import BackFon from "../../../admin/control_managers/backfon/BackFon";
import {AuthContext} from "../../../../contexts/authContext";
import useTable from "../../../admin/control_managers/tablesControl/table/useTable";
import TableFooter from "../../../admin/control_managers/tablesControl/table/TableFooter";
export default function AllRooms(){

    const [rooms, setRoom] = useState([]);
    const [firstRoomImage, setFirstRoomImage] = useState({});
    const {authData} = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showBackFon, setShowBackFon] = useState(false);

    const [page, setPage] = useState(1);
    const { slice, range } = useTable(rooms, page, 6);

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

    const deleteRoom = async (id) => {
        setSelectedRoom(id);
        setShowModal(true);
        setShowBackFon(true);
    };

    const handleConfirmDelete = async () => {
        await axios.delete(`http://localhost:8080/room/${selectedRoom}`);
        setSelectedRoom(null);
        setShowModal(false);
        setShowBackFon(false);
        LoadRooms();
    };

    const handleCancelDelete = () => {
        setSelectedRoom(null);
        setShowModal(false);
        setShowBackFon(false);
    };


    return(
        <div className="main-cards-container">
            {showBackFon && <BackFon show={showBackFon} clicked={handleCancelDelete}></BackFon>}
            <div className="name-page"><span>Номера и апартаменты</span></div>
            <div className="cards-container">
                <div className="cards-container2">
                {
                    slice.map((room) =>(
                        <div className="room-card-grid" key={room.id}>
                            <div className="room-card">
                                <div className="image_container">
                                    {
                                        firstRoomImage[room.id] ? (
                                            <img className="image_room" src={firstRoomImage[room.id]} alt="preview room image" width="400px" height="300px" loading="lazy"/>
                                        ):(
                                            <img className="image_room" src={noFoto} alt="no preview room image" width="400px" height="300px" loading="lazy"/>
                                        )
                                    }
                                    {
                                        authData && authData.roles[0] === 'MANAGER' ? (
                                            <div className="manager-tools">
                                                <Link className="manager-tools-btn" to={`/editroom/${room.id}`}><MdOutlineEdit/></Link>
                                                <button className="manager-tools-btn" onClick={()=> deleteRoom(room.id)}><MdDeleteOutline/></button>
                                            </div>
                                        ): ""
                                    }
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
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
            {showModal && (
                <div className="modal_window">
                    <div className="modal_main">
                        <p className="question">Вы уверены, что хотите удалить данный номер?</p>
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
    );
}