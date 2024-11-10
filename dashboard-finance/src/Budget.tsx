// src/pages/Admin.tsx
import React from 'react';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from 'react-chartjs-2';
import './Budget.css';  // Import the CSS file

// ChartJS.register(ArcElement, Tooltip, Legend);

// const data = {
//   labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
//   datasets: [
//     {
//       data: [32, 27, 23, 18],
//       backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0', '#FFCE56'],
//       hoverBackgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0', '#FFCE56'],
//     },
//   ],
// };

const Budget: React.FC = () => {
  return (
    <div className="budg_cont">
      <div className="navbar">
        <div className="nav-item">Budget Drafter </div>
        <div className="nav-item"><button>Back</button></div>
      </div>

      <div className="Budget-container">
        <h1>Please Rate these categories 1-5</h1>
        <h2>1 - Most Important 5 - Least Important</h2>
        <div className="cat">
        <p>Enter Insurance</p>
        <input type="text" />
        </div>

        <div className="cat">
        <p>Enter total fees</p>
        <input type="text" />
        </div>

        <div className="cat">
        <p>Outreach</p>
        <input type="text" />
        </div>

        <div className="cat">
        <p>Brotherhood</p>
        <input type="text" />
        </div>

        <div className="cat">
        <p>Charity</p>
        <input type="text" />
        </div>

        <div className="cat">
        <p>Fees</p>
        <input type="text" />
        </div>

        <div className="cat">
        <p>Rush Events</p>
        <input type="text" />
        </div>
      </div>
      <div className="subbutton"><button>Submit</button></div>
    </div>
  );
};

export default Budget;
