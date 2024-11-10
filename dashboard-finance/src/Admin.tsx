import React from 'react';
import { Link } from "react-router-dom";
import './Admin.css'; // Import plain CSS file
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
  datasets: [
    {
      data: [32, 27, 23, 18],
      backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0', '#FFCE56'],
    },
  ],
};

const Admin: React.FC = () => {
  return (
    <div className="admin-wrapper">
      <div><h1>Welcome, Admin</h1></div>
      
      {/* Navbar */}
      <div className="navbar">
        <Link to="/budget_drafter" className="nav-item">Draft a Budget</Link>
        <Link to="/sponsors" className="nav-item">View Sponsors</Link>
        <Link to="/dues-and-fees" className="nav-item">Track Dues and Fees</Link>
        <Link to="/fundraising" className="nav-item">Fundraising</Link>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-container">
        {/* Summary Section */}
        <div className="summary">
          <div className="summary-card">
            <h3>Recent Sponsors</h3>
            <p>1. State Farm - $10,000</p>
            <p>2. ACME Corp - $7,500</p>
            <p>3. Johnson & Johnson - $5,000</p>
          </div>
          <div className="summary-card">
            <h3>Total Dues Paid</h3>
            <p>$1,200,000</p>
          </div>
          <div className="summary-card">
            <h3>Fundraising Goal Met</h3>
            <p>$500,000 / $1,000,000</p>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="section">
          <h3>Budget Allocation</h3>
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
};

export default Admin;