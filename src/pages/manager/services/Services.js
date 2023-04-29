import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "./Services.css"
import {toast} from "react-toastify";
import {TfiSave}  from "react-icons/tfi"
export default function Services(){

    const [meals, setMeals] = useState([]);
    const [startMeal, setStartMeal] = useState([]);

    const LoadMeals = async ()=>{
        axios.get('http://localhost:8080/list/type_meals')
            .then(response =>{
                setMeals(response.data);
                setStartMeal(response.data.map(meal => ({ id: meal.id, cost: meal.cost })));
            })
            .catch(error =>{
                console.log(error);
            });
    }

    useEffect(()=>{
        LoadMeals();
    }, []);

    const handleCostChange = (id, cost) => {
        axios.put(`http://localhost:8080/updateMeal/${id}/${cost}`)
            .then(response => {
                setMeals(meals.map(meal => {
                    if (meal.id === id) {
                        meal.cost = cost;
                        meal.isDirty = false;
                    }
                    return meal;
                }));
                toast.success('Вы успешно изменили данные стоимости!');
                LoadMeals();
            })
            .catch(error => {
                console.log(error);
            });
    }
    const handleChange = (e, id) => {
        setMeals(
            meals.map((meal, index) =>{
                if (meal.id === id){
                    const startMealItem = startMeal.find(m => m.id === id);
                    if(startMealItem.cost.toString() === e.target.value.toString()){
                        meal.cost = e.target.value;
                        meal.isDirty = false;
                    }else if(e.target.value === ""){
                        toast.error('Введите стоимость!');
                        meal.cost = e.target.value;
                        meal.isDirty = false;
                    }else {
                        meal.cost = e.target.value;
                        meal.isDirty = true;
                    }
                }
                return meal;
            })
        );
    };

    const  handleSave = (id, cost) =>{
      handleCostChange(id, cost)
    };

    return(
        <div>
            <div className="name-page"><span>Услуги</span></div>
            <div className="table-service">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Стоимость бел. руб</th>
                        <th scope="col" ></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        meals.map((meal, index) => (
                            <tr key = {index}>
                                <td scope="row" >
                                    <p className="number">{index + 1}</p>
                                </td>
                                <td>
                                    <p className="table_text">{meal.name}</p>
                                </td>
                                <td>
                                    <input className="table_text"
                                           value={meal.cost}
                                           onChange={(e) => handleChange(e, meal.id)}
                                    />
                                </td>
                                <td style={{width: "200px"}}>
                                    {
                                        meal.isDirty && (
                                            <button className="btn-edit-meal" onClick={() => handleSave(meal.id, meal.cost)}><TfiSave/></button>
                                        )
                                    }
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}