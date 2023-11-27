
import './nav-bar.css';

import React from 'react';

const NavBar: React.FC = () =>{
  return (
    <div className="nav">
      <div className="nav-left">
        <i className="navIcon fa-brands fa-square-facebook"></i>
        <i className="navIcon fa-brands fa-square-twitter"></i>
        <i className="navIcon fa-brands fa-square-pinterest"></i>
        <i className="navIcon fa-brands fa-square-instagram"></i>
      </div>
      <div className="nav-center">
        <ul className="nav-bar-list">
          <li className="nav-list-item">HOME</li>
          <li className="nav-list-item">EVENTS</li>
          <li className="nav-list-item">HAPPENINGS</li>
          <li className="nav-list-item">MARKETPLACE</li>
          <li className="nav-list-item">CONTACT</li>
        </ul>
      </div>
      <div className="nav-right">
        <img className="navImg" src="https://picsum.photos/seed/picsum/200/300" alt="" />
        <i className="navSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  )
}

export default NavBar;

