import React from 'react';

const RegisterForm = () => {
    return(
        <form action="http://localhost:4000/users/register" method="POST">
            <input name="email" type="text" placeholder="Enter Username"></input>
            <input name="password" type="password" placeholder="Enter password"></input>
            <input name="password2" type="password" placeholder="Enter password"></input>
            <input type="submit"></input>
        </form>
    )
}

export default RegisterForm;