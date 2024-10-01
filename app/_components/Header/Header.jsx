"use client";

import { useAuth } from "../../context/AuthContext";
import "./styles/index.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const [location, setLocation] = useState(() => {
    const storedLocation = localStorage.getItem("userLocation");
    return storedLocation ? JSON.parse(storedLocation) : null;
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (!location && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(newLocation);
          localStorage.setItem("userLocation", JSON.stringify(newLocation));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [location]);

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <div className="nav-image">
            <Link href="/">
              <img
                src="https://media.istockphoto.com/id/1179573533/vector/vector-group-of-pets-dog-cat-humming-bird-parrot-chameleon-butterfly-rabbit-isolated-on.jpg?s=612x612&w=0&k=20&c=SFDqjevwsQ00ZoZWFQRhscVxnrrkVDns0KjDH-hUynA="
                alt="logo"
              />
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
              <Link href="/">HOME</Link>
            </li>
            <li>
              <Link href="/pets">ANIMAIS</Link>
            </li>
            <li>
              <Link href="/shelter">ASSOCIAÇÕES</Link>
            </li>
            <li>
              <Link href="/donation">DOAÇÕES</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link href="/editProfile">EDITAR PERFIL</Link>
                </li>

                <li>
                  <Link href="/logout">SAIR</Link>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login">LOGIN</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
