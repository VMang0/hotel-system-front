import React, {useEffect, useState} from 'react'
import axios from "axios";
import './AddRoom.css';
import {useNavigate} from "react-router-dom";
import Dropzone, { useDropzone } from "react-dropzone";
import {toast} from "react-toastify";
import {TiDeleteOutline} from "react-icons/ti"
export default function AddRoom() {
    let navigate = useNavigate();
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

    const onSubmit = async (e) =>{
        e.preventDefault();
        const formData = new FormData();

        formData.append("room", JSON.stringify(room));
        if(files.length > 0){
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }
        }else{
            formData.append('files', new File([""], "no-photo.jpg", { type: "image/jpeg" }));
        }

        if(type_room === "" || type_bed === "" || number === ""){
            toast.error('Заполните все поля!');
        }else{
            await axios.post("http://localhost:8080/add_room", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
            navigate("/");
            toast.success('Вы успешно добавили новый номер!');
        }

    };

    const onDrop = (acceptedFiles) => {
        setFiles([...files, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const onInputChange = (e)=>{
        setRoom({...room,[e.target.name]: e.target.value});
    };

    const removeFile = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    return(
        <div>
            <div className="name-page"><span>Добавление номера</span></div>
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
                    {/*<Dropzone onDrop={onDrop}>
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps({name: 'files'})} style={{color: "#fff"}} className="dropfiles"/>
                                <div className="file-list">
                                    {files.map((file) => (
                                        <p key={file.name}>{file.name}</p>
                                    ))}
                                </div>
                            </div>

                        )}
                    </Dropzone>*/}
                    <div className="form-create-ones">
                        <div className="text-add-room"><label>Фотографии</label></div>
                        <div {...getRootProps()} className="dropzone">
                            <input {...getInputProps()} />
                            <p>Перетащите файлы сюда или кликните, чтобы выбрать файлы</p>
                        </div>
                        {files.length > 0 && (
                            <ul>
                                {files.map((file, index) => (
                                    <li key={index}>
                                        <div className="form-for-img">
                                            <img src={URL.createObjectURL(file)} alt={file.name} width="100px"/>
                                            <button onClick={() => removeFile(index)} className="btn-delete-img"><TiDeleteOutline/></button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button type="submit" className= "btn-add-room">Добавить</button>
                </form>
            </div>
        </div>
    );
}