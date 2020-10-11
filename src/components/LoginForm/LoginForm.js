import React from 'react';

const LoginForm = () => {
    return(
        <form action="http://localhost:4000/users/login" method="POST">
            <input type="text" name="email" placeholder="Enter Username"></input>
            <input type="password" name="password" placeholder="Enter password"></input>
            <input type="submit"></input>
        </form>
    )
}

export default LoginForm;