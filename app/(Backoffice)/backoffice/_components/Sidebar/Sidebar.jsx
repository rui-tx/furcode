"use client";
import React, { useState } from "react";
import { Home, Cat, Building, Users, Heart, FileText } from "lucide-react";
import "./styles/index.css";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: Home },
    { name: "Animais", icon: Cat },
    { name: "Abrigo", icon: Building },
    { name: "Staff", icon: Users },
    { name: "Adoções", icon: Heart },
    { name: "Relatórios animal", icon: FileText },
  ];

  return (
    <nav className="backoffice-sidebar">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <a
              href="#"
              className={`sidebar-item ${
                activeItem === item.name ? "active" : ""
              }`}
              onClick={() => setActiveItem(item.name)}
            >
              <item.icon size={24} />
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;