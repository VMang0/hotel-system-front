import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "./Services.css"
import {toast} from "react-toastify";
export default function Services(){

    const [meals, setMeals] = useState([]);
    const [updateMeal, setupdateMeal] = useState({
        id: "",
        name: "",
        cost: ""
    });

    const LoadMeals = async ()=>{
        axios.get('http://localhost:8080/list/type_meals')
            .then(response =>{
                setMeals(response.data);
            })
            .catch(error =>{
                console.log(error);
            });
    }

    useEffect(()=>{
        LoadMeals();
    }, []);

   /* const handleCostChange = (id, cost) => {
        axios.put(`http://localhost:8080/updateMeal/${id}/${cost}`)
            .then(response => {
                setMeals(meals.map(meal => {
                    if (meal.id === id) {
                        meal.cost = cost;
                    }
                    return meal;
                }));
                toast.success('Вы успешно изменили данные стоимости!');
            })
            .catch(error => {
                console.log(error);
            });
    }
    const handleChange = (e, id) => {
        setupdateMeal({ ...updateMeal, id: id, cost: e.target.value });
    }*/

    return(
        <div>
            <div className="name-page"><span>Услуги</span></div>
            <div className="table-service">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Cost</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        meals.map((meal, index) => (
                            <tr key = {index}>
                                <td scope="row" ><p className="number">{index + 1}</p></td>
                                <td><p className="table_text">{meal.name}</p></td>
                                <td><input className="table_text" value={meal.cost}/></td>
                                <td><button></button></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}