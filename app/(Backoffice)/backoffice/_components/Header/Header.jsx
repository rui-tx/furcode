"use client";
import React from "react";
import { Bell, User, LogOut } from "lucide-react";
import "./styles/index.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const Header = () => {
  const router = useRouter();
  const { user } = useAuth();

  // Adicione uma verificação para evitar erros caso o usuário não esteja definido
  const userName = user ? user.firstName : "Visitante";

  const handleLogout = () => {
    // Aqui você pode querer limpar o localStorage e redirecionar para a página de login
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <header className="backoffice-header">
      <div className="backoffice-header-logo">
        <h1>Furcode CRM</h1>
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
        <button className="backoffice-header-logout" onClick={handleLogout}>
          <LogOut size={24} />
          <span>Sair</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
