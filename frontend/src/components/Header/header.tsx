import React from 'react';
import './header.scss';

function Header() {
    return (
        <div className="header">
            <div className="logo">Phone<span>Book</span></div>
            <div className="cta">
                <button>Launch App</button>
            </div>
        </div>
    )
}

export default Header