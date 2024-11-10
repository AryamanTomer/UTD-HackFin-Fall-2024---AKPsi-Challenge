// src/pages/Member.tsx
import React from 'react';
import './Member.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const Member: React.FC = () => {
  return (
    <div className="member-container">
      <div className="navbar">
        <div className="nav-item">Welcome, Name</div>
        <Link to="/PayDues" className="nav-item">Pay Dues</Link>
        <div className="nav-item"><button className="nav-button">View Announcements</button></div>
        <div className="nav-item"><button className="nav-button">Fundraising</button></div>
        <div className="nav-item"><button className="nav-button">Events</button></div>
      </div>

      <div className="member-dashboard">
        <h1 className="title">Rate These Categories (1-5)</h1>
        <h2 className="subtitle">1 - Most Important, 5 - Least Important</h2>

        {/* Category Inputs */}
        {['Insurance', 'Total Fees', 'Outreach', 'Brotherhood', 'Charity', 'Fees', 'Rush Events'].map((category, index) => (
          <div key={index} className="category-row">
            <p>{category}</p>
            <input type="number" min="1" max="5" className="input-box" />
          </div>
        ))}

        {/* Submit Button */}
        <div className="submit-button-container">
          <button className="submit-button">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Member;
