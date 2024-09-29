import React from "react";
import { Bell, User, LogOut } from "lucide-react";
import "./styles/index.css";

const Header = ({ userName }) => {


  return (
    <header className="backoffice-header">
      <div className="backoffice-header-logo">
        <h1>PetAdopt CRM</h1>
      </div>
      <div className="backoffice-header-right">
        <span className="backoffice-header-user">Olá, {userName}</span>
        <div className="backoffice-header-notification">
          <Bell size={24} />
          <span className="backoffice-header-notification-badge">3</span>
        </div>
        <div className="backoffice-header-user-icon">
          <User size={24} />
        </div>
        <button className="backoffice-header-logout">
          <LogOut size={24} />
          <span>Sair</span>
        </button>
      </div>
    </header>
  );
};

export default Header;