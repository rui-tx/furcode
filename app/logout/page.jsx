"use client";

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

import "./styles/index.css";

const Page = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="login-container">
      <div className="container-login">
        <div className="title-login">Logout</div>
        <div>
          <p>Logout com sucesso!</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
