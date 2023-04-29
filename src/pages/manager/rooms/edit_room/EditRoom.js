import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
export default function EditRoom() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [typeRoom, setTypeRoom] = useState([]);
    const [typeBed, setTypeBed] = useState([]);
    const [room, setRoom] =useState({
        number: "",
        cost: "",
        type_room: "",
        type_bed: "",
        square: "",
        description: "",
        name: ""
    });

    const [files, setFiles] = useState([]);
    const {number, cost, type_room, type_bed, square, description, name} = room;
    useEffect(()=>{
        axios.get('http://localhost:8080/list/type_room')
            .then(response =>{
                setTypeRoom(response.data);
            })
            .catch(error =>{
                console.log(error);
            });

        axios.get('http://localhost:8080/list/type_bed')
            .then(response =>{
                setTypeBed(response.data);
            })
            .catch(error =>{
                console.log(error);
            });
    }, []);

    useEffect(()=> {
        axios.get(`http://localhost:8080/room/${id}`)
            .then(response =>{
                setRoom(response.data);
            })
            .catch(error =>{
                console.log(error);
            });

        axios.get(`http://localhost:8080/image/${id}`)
            .then(response =>{
                setFiles(response.data)
            })
            .catch(error =>{
                console.log(error);
            });
    }, [id]);

    const onSubmit = async (e) =>{
        e.preventDefault();
        if(type_room === "" || type_bed === "" || number === ""){
            toast.error('Заполните все поля!');
        }else{
            await axios.put("http://localhost:8080/edit_room", room)
            navigate("/");
            toast.success('Вы успешно обновили данные номера!');
        }

    };

    const onInputChange = (e)=>{
        setRoom({...room,[e.target.name]: e.target.value});
    };

    return(
        <div>
            <div className="name-page"><span>Изменение номера</span></div>
            <div className="form-add-room">
                <form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">
                    <div className="form-create">
                        <div className="form-create-ones">
                            <div className="text-add-room"><label>Тип номера</label></div>
                            <select value={type_room} className="select-add-room" onChange={(e) => onInputChange(e)} name="type_room" required>
                                <option>Choose</option>
                                {
                                    typeRoom.map(typeRoom =>(
                                        <option key={typeRoom.id} value={typeRoom.name}>{typeRoom.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-create-ones">
                            <div className="text-add-room"><label>Тип кровати</label></div>
                            <select value={type_bed} className="select-add-room" onChange={(e) => onInputChange(e)} name="type_bed" required>
                                <option>Choose</option>
                                {
                                    typeBed.map(typeBed =>(
                                        <option key={typeBed.id} value={typeBed.name}>{typeBed.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-create-ones">
                            <div className="text-add-room"><label>Максимальное кол-во человек</label></div>
                            <select value={number} className="select-add-room" onChange={(e) => onInputChange(e)} name="number" required>
                                <option>Choose</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="form-create-ones">
                            <div className="text-add-room"><label>Стоимость на 1-го</label></div>
                            <input type="number" value={cost} placeholder="цена" onChange={(e) => onInputChange(e)} name="cost" required/>
                        </div>
                        <div className="form-create-ones">
                            <div className="text-add-room"><label>Описание</label></div>
                            <textarea maxLength="380" value={description} placeholder="текст" onChange={(e) => onInputChange(e)} name="description" required/>
                        </div>
                        <div className="form-create-ones">
                            <div className="text-add-room"><label>Площадь</label></div>
                            <input type="number" value={square} placeholder="площадь" onChange={(e) => onInputChange(e)} name="square" required/>
                        </div>
                        <div className="form-create-ones">
                            <div className="text-add-room"><label>Название</label></div>
                            <input maxLength="67" type="text" value={name} placeholder="название" onChange={(e) => onInputChange(e)} name="name" required/>
                        </div>
                    </div>
                    <div className="form-create-ones">
                        <div className="text-add-room"><label>Фотографии</label></div>
                        {files.length > 0 && (
                            <ul>
                                {files.map((file, index) => (
                                    <li key={index}>
                                        <div className="form-for-img">
                                            <img className="n_images" key={index + 1} src={`data:image/jpeg;base64,${file.bytes}`} alt="" loading="lazy" width="100px"/>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button type="submit" className= "btn-add-room">Редактировать</button>
                </form>
            </div>
        </div>
    );
}