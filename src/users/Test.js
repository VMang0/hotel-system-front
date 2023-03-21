import React from "react";

const User = () => {
    // get user information from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <h1>Welcome {user.email}!</h1>
        </div>
    );
};

export default User;