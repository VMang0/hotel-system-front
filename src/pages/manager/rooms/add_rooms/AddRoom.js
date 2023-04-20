import React, {useEffect, useState} from 'react'
import axios from "axios";
import './AddRoom.css';
import {useNavigate} from "react-router-dom";
import Dropzone, { useDropzone } from "react-dropzone";
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

        await axios.post("http://localhost:8080/add_room", formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        navigate("/");

    };

    const onDrop = (acceptedFiles) => {
        setFiles([...files, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const onInputChange = (e)=>{
        setRoom({...room,[e.target.name]: e.target.value});
    };

    return(
        <form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">

            <div className="form-create">
                <select value={type_room} onChange={(e) => onInputChange(e)} name="type_room">
                    <option key={typeRoom.id} value={typeRoom.name}>{typeRoom.name}</option>
                    {
                        typeRoom.map(typeRoom =>(
                            <option key={typeRoom.id} value={typeRoom.name}>{typeRoom.name}</option>
                        ))
                    }
                </select>
                <select value={type_bed} onChange={(e) => onInputChange(e)} name="type_bed">
                    <option value="" disabled>Choose an option</option>
                    {
                        typeBed.map(typeBed =>(
                            <option key={typeBed.id} value={typeBed.name}>{typeBed.name}</option>
                        ))
                    }
                </select>
                <select value={number} onChange={(e) => onInputChange(e)} name="number">
                    <option value="" disabled>Choose an option</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <input type="number" value={cost} placeholder="цена" onChange={(e) => onInputChange(e)} name="cost"/>
                <input type="text" value={description} placeholder="текст" onChange={(e) => onInputChange(e)} name="description"/>
                <input type="number" value={square} placeholder="площадь" onChange={(e) => onInputChange(e)} name="square"/>
                <input type="text" value={name} placeholder="название" onChange={(e) => onInputChange(e)} name="name"/>
            </div>
            <Dropzone onDrop={onDrop}>
                {({getRootProps, getInputProps}) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps({name: 'files'})} style={{color: "#fff"}} />
                        <p>Drag and drop some files here, or click to select files</p>
                        <div className="file-list">
                            {files.map((file) => (
                                <p key={file.name}>{file.name}</p>
                            ))}
                        </div>
                    </div>

                )}
            </Dropzone>
            <button type="submit" className= "btn btn-outline-primary">Submit</button>
        </form>

    );
}