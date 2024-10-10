import React from "react";
import "./styles/index.css";

const BackofficeContent = () => {
  return (
    <div className="backoffice-container">
      <div className="backoffice-container-table">
        <h1 className="dashboard-title">Bem vindo(a) ao PetHub CRM</h1>

        <div className="stats-container">
          <div className="stat-card">
            <h3>Animais Disponíveis</h3>
            <p>42</p>
          </div>
          <div className="stat-card">
            <h3>Shelters Disponíveis</h3>
            <p>3</p>
          </div>
          <div className="stat-card">
            <h3>Adoções este mês</h3>
            <p>15</p>
          </div>
          <div className="stat-card">
            <h3>Voluntários Ativos</h3>
            <p>28</p>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Ações Rápidas</h2>
          <div className="action-buttons">
            <button>Adicionar Novo Animal</button>
            <button>Processar Adoções</button>
            <button>Gerenciar Voluntários</button>
            <button>Visualizar Relatórios Animais</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackofficeContent;
