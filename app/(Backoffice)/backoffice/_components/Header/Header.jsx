"use client";
import React from "react";
import { Bell, User, LogOut } from "lucide-react";
import "./styles/index.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const Header = () => {
  const router = useRouter();
  const { user } = useAuth();

  const userName = user ? user.firstName : "Visitante";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <header className="backoffice-header">
      <div className="backoffice-header-logo">
        <h1>PetHub CRM</h1>
      </div>
      <div className="backoffice-header-right">
        <span className="backoffice-header-user">Olá, {userName}</span>
        <button className="backoffice-header-logout" onClick={handleLogout}>
          <LogOut size={24} />
          <span>Sair</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
