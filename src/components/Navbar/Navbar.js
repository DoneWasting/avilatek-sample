import React from 'react';
import './Navbar.css';
import {NavLink} from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar">
              <header>
            <nav>
                <ul>
                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink to="/products/favorites">Favorites Products</NavLink></li>
                    <li><NavLink to="/products/addProduct">Publica tus productos</NavLink></li>
                    <li><NavLink to="/users/login">Login</NavLink></li>
                    <li><NavLink to="/users/register">Register</NavLink></li>
                </ul>
            </nav>
        </header>
        </div>
      
    )
}

export default Navbar;