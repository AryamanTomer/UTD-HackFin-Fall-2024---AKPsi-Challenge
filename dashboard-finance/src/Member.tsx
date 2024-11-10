import React from 'react';
import './Member.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import akpsiLogo from './assets/Akpsi-coa.png'; // Import the image

const Member: React.FC = () => {
  return (
    <div className="member-container">
      {/* Navbar */}
      <div className="navbar">
        <div className="nav-item">Welcome, Name</div>
        <Link to="/PayDues" className="nav-item">Pay Dues</Link>
        <div className="nav-item"><button className="nav-button">View Announcements</button></div>
        <div className="nav-item"><button className="nav-button">Fundraising</button></div>
        <div className="nav-item"><button className="nav-button">Events</button></div>
      </div>

      {/* Dashboard */}
      <div className="member-dashboard">
        {/* Image Section */}
        <div className="image-container">
          <img 
            src={akpsiLogo} // Use the imported image
            alt="Member Feature" 
            className="dashboard-image" 
          />
          <p className="image-caption">AKPSI 4 LYFE!</p>
        </div>
      </div>
    </div>
  );
};

export default Member;
