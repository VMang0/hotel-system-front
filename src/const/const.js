import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const userFromStorage = () => {
    const user = localStorage.getItem('user');
    if (user) {
        if(JSON.parse(user).user){
            return JSON.parse(user).user
        }
        return JSON.parse(user);
    }
}

export const userIsUser = () => userFromStorage()?.role === "USER";
export const userIsAdmin = () => userFromStorage()?.role === "ADMIN";
