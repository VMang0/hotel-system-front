import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import axios from "axios";

export default function ViewUser() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { id } = useParams();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`);
        setUser(result.data);
    };

    return (
        <div className= "container">
            <div className= "row">
                <div className= "col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h3 className= "text-center m-3 ">User Details</h3>
                    <div className= "card-header"> Details of user id: {user.id}
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <b>Email: </b>
                                {user.email}
                            </li>
                            <li className="list-group-item">
                                <b>Password: </b>
                                {user.password}
                            </li>
                        </ul>
                    </div>
                    <Link className="btn btn-primary my-2" to={"/"}>Back to Home</Link>
                </div>
            </div>
        </div>
    );
}