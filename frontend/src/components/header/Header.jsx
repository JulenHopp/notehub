import React from "react";
import logo from '/src/assets/logo.png';
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo-container">
        <img src={logo} alt="Logo" className="header-logo"/>
      </div>
    </header>
  );
}

export default Header;