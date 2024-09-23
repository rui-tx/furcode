import React from "react";
import "./styles/index.css";

const Header = () => {
  return (
    <>
      <div className="header">
        <h1>Header</h1>
        <ul>
          <li>HOME</li>
          <li>PETS</li>
          <li>SHELTER</li>
          <li>DONATIONS</li>
          <li>LOGIN</li>
        </ul>
      </div>
    </>
  );
};

export default Header;
