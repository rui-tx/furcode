import React from "react";
import "./styles/index.css";

const BackofficeContent = () => {
  return (
    <div className="backoffice-container">
      <div className="backoffice-container-table">
        <h1 className="dashboard-title">Welcome to Furcode CRM</h1>

        <div className="stats-container">
          <div className="stat-card">
            <h3>Animals in Care</h3>
            <p>42</p>
          </div>
          <div className="stat-card">
            <h3>Available Shelters</h3>
            <p>3</p>
          </div>
          <div className="stat-card">
            <h3>Adoptions this Month</h3>
            <p>15</p>
          </div>
          <div className="stat-card">
            <h3>Active Volunteers</h3>
            <p>28</p>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button>Add New Animal</button>
            <button>Process Adoption</button>
            <button>Manage Volunteers</button>
            <button>View Reports</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackofficeContent;
