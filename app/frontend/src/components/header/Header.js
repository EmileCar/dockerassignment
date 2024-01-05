import "./header.css";
import React from 'react';
import logo from '../../assets/img/ksaLogo.svg'
import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';



function Header({ title }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsNavOpen(false);
  }, [location]);

  const handleClickNavToggle = () => {
    console.log(isNavOpen)
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="header">
      <div className={`header__content ${isNavOpen ? 'preload open' : 'preload'}`}>
        <Link to="/" className="header__logo--container layered-grid">
          <img className="header__logo" src={logo} alt="Logo" />
          <h1>Ksa Oosterzele</h1>
          {title && title === 'ADMIN' && <h2 className="admin-mark">Adminmodus</h2>}
        </Link>
        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <nav className={`navbar ${isNavOpen ? 'navOpen' : ''}`}>
          <ul className="menu__items">
            <li className="menu__item">
              <Link className="item__link" to="/">
                Home
              </Link>
            </li>
            <li className="menu__item">
              <Link className="item__link" to="/activiteiten">
                Activiteiten
              </Link>
            </li>
            <li className="menu__item">
              <Link className="item__link" to="/media">
                Media
              </Link>
            </li>
            <li className="menu__item">
              <Link className="item__link" to="/inschrijven">
                Inschrijven
              </Link>
            </li>
            <li className="menu__item">
              <Link className="item__link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <label htmlFor="nav-toggle" className="toggle-button" onClick={handleClickNavToggle}>
          <span className="toggle-button-bar"></span>
          <span className="toggle-button-bar"></span>
          <span className="toggle-button-bar"></span>
        </label>
      </div>
    </header>
  );
}

export default Header;
