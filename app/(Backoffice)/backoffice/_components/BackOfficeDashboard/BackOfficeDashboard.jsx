import React from "react";
import "./styles/index.css";
import Link from "next/link";

const BackofficeContent = () => {
  return (
    <div className="backoffice-container">
      <div className="backoffice-container-table">
        <h1 className="dashboard-title">Welcome to PetHub CRM</h1>

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
            <Link href="/backoffice/pets" className="action-link">
              Add New Animal
            </Link>
            <Link href="/backoffice/adoptionrequest" className="action-link">
              Process Adoption
            </Link>
            <Link href="/backoffice/staff" className="action-link">
              Manage Volunteers
            </Link>
            <Link href="/backoffice/animalReports" className="action-link">
              View Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackofficeContent;
