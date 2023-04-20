import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
export default function Services(){

    const [meals, setMeals] = useState([]);

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

    return(
        <div>
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
                            <td><p className="table_text">{meal.cost} $</p></td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}