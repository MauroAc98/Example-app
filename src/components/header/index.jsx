
// eslint-disable-next-line no-unused-vars
import React from "react";
import './styles.css';

const Header = () => {
    return (
        <header className="header">
            <a href="/" className="logo">TDI</a>
            <input type="checkbox" className="side-menu" id="side-menu" />
            <label className="hamb" htmlFor="side-menu">
                <span className="hamb-line"></span>
            </label>
            <nav className="nav">
                <ul className="menu">
                    <li><a href="#">About</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Categories</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;