"use client";
import React, { useState } from "react";
import { Home, Cat, Building, Users, Heart, FileText } from "lucide-react";
import Link from "next/link";
import "./styles/index.css";
const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const menuItems = [
    { name: "Dashboard", icon: Home, href: "/" },
    { name: "Animais", icon: Cat, href: "/backoffice/pets" },
    { name: "Abrigo", icon: Building, href: "/backoffice/shelter" },
    {name: "Adoções", icon: Heart, href: "/backoffice/adoptionrequest"},
    { name: "Staff", icon: Users, href: "/backoffice/staff" },
    { name: "Doações", icon: Heart, href: "/backoffice/donation" },
    {
      name: "Relatórios animal",
      icon: FileText,
      href: "/backoffice/animalReports",
    },
  ];
  return (
    <nav className="backoffice-sidebar">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className={`sidebar-item ${
                activeItem === item.name ? "active" : ""
              }`}
              onClick={() => setActiveItem(item.name)}
            >
              <item.icon size={24} />
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Sidebar;