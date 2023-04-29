import YandexMap from "./maps/YandexMap";
import axios from "axios";
import React, {useState} from "react";

export default function Contacts(){
    const [number, setNumber] = useState("");
    const handleAddCallRequest = async () =>{
        const callData = {
            phoneNumber: number
        }
        await axios.post("http://localhost:8080/call_request", callData);
        setNumber("");
    };

    const onInputChange = (e)=>{
        setNumber(e.target.value);
    };

    return(
        <div>
            <YandexMap/>
            <div>
                <input value={number} onChange={(e)=> onInputChange(e)} required/>
                <button onClick={()=> handleAddCallRequest()}>Отправить</button>
            </div>
        </div>

    );
}