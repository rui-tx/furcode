"use client";
import { useAuth } from "../../context/AuthContext";
import "./styles/index.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import logotipo from "../../_images/logotipo.png";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();


  
  // const [location, setLocation] = useState(() => {
  //   const storedLocation = localStorage.getItem("userLocation");
  //   return storedLocation ? JSON.parse(storedLocation) : null;
  // });
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };




const ableToOpenBackOffice = () => {
  if (user.role === "MANAGER") {
    setAbleToBackOffice(true);
  } else {
    setAbleToBackOffice(false);
  }
};
  // useEffect(() => {
  //   if (!location && navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const newLocation = {
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         };
  //         setLocation(newLocation);
  //         localStorage.setItem("userLocation", JSON.stringify(newLocation));
  //       },
  //       (error) => {
  //         console.error("Error getting location:", error);
  //       }
  //     );
  //   }
  // }, [location]);
  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <div className="nav-image">
            <Link href="/">
              <img src={logotipo.src} className="logotipo-image" />
            </Link>
          </div>
        </div>
        {/* Hamburguer Icon */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span className={`bar ${menuOpen ? "bar1" : ""}`}></span>
          <span className={`bar ${menuOpen ? "bar2" : ""}`}></span>
          <span className={`bar ${menuOpen ? "bar3" : ""}`}></span>
        </div>
        {/* Navigation */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link href="/">INÍCIO</Link>
            </li>
            <li>
              <Link href="/pets">ANIMAIS</Link>
            </li>

            <li>
              <Link href="/donation">DOAÇÕES</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link href="/shelter">ASSOCIAÇÕES</Link>
                </li>
                
                <li>
                  <Link href="/editProfile">PERFIL</Link>
                </li>
                <li>
                  <Link href="/logout">SAIR</Link>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login">ENTRAR</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Header;
