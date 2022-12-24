import React from "react";
import logo from "../UI/img/logo.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header style={{ backgroundColor: "#212121", height: "10vh" }}>
      <NavLink to={"/"} className='wrapper' style={{ textDecoration: "none", color: "white", display: 'flex', columnGap: '10px', alignItems: 'center', height: 'inherit' }}>
        <img style={{ color: "black" }} src={logo} alt="logo" />
        <p style={{ fontSize: '1.2rem' }}>MyContacts</p>
      </NavLink>
    </header>
  );
};

export default Header;
