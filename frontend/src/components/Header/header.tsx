import React from 'react';
import { Link, NavLink } from "react-router-dom";
import './header.scss';

function Header() {
    return (
        <div className="header">
            <div className="logo">Phone<span>Book</span></div>
            <div className="cta">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            </div>
        </div>
    )
}

export default Header