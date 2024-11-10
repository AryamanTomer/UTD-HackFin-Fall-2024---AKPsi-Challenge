import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { Pie } from 'react-chartjs-2'; // Import Pie Chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // Import necessary chart elements
import './Budget.css'; // Import the CSS file

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the type for the chart data
interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }[];
}

const Budget: React.FC = () => {
  const [budgetData, setBudgetData] = useState({
    capital: '',
    insurance: '',
    fees: '',
    outreach: '',
    brotherhood: '',
    charity: '',
    rushEvents: '',
  });

  // Explicitly type the chartData state
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0', '#FFCE56', '#FF9F40', '#FFCD56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0', '#FFCE56', '#FF9F40', '#FFCD56'],
      },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBudgetData({ ...budgetData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:1337/api/budget_drafter', budgetData); // Send data to your backend
      console.log('Data submitted successfully:', response.data);

      // Parse the response data and set up chart data
      const { Outreach, Brotherhood, RushEvents, Charity, Insurance, Fees } = response.data;
      
    
      const parsedData = [
        parseFloat(Insurance),
        parseFloat(Fees),
        parseFloat(Outreach),
        parseFloat(Brotherhood),
        parseFloat(Charity),
        parseFloat(RushEvents),
      ];

  

      const parsedLabels = [
        'Insurance',
        'Fees',
        'Outreach',
        'Brotherhood',
        'Charity',
        'Rush Events',
      ];

      // Update chartData state with the parsed data
      setChartData({
        labels: parsedLabels,
        datasets: [
          {
            data: parsedData,
            backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0', '#FFCE56', '#FF9F40', '#FFCD56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0', '#FFCE56', '#FF9F40', '#FFCD56'],
          },
        ],
      });

      console.log(chartData);

      alert('Budget submitted successfully!');
    
    } catch (error) {
      console.error('Error submitting budget:', error);
      alert('Failed to submit budget.');
    }
  };

  return (
    <div className="budg_cont">
      <div className="navbar">
        <div className="nav-item">Budget Drafter</div>
        <Link to="/admin" className="nav-item">
          Back
        </Link>
      </div>

      <div className="Budget-container">
        <div className="cat">
          <p>Enter Capital</p>
          <input
            type="text"
            name="capital"
            value={budgetData.capital}
            onChange={handleChange}
          />
        </div>

        <div className="cat">
          <p>Enter Insurance</p>
          <input
            type="text"
            name="insurance"
            value={budgetData.insurance}
            onChange={handleChange}
          />
        </div>

        <div className="cat">
          <p>Enter Total Fees</p>
          <input
            type="text"
            name="fees"
            value={budgetData.fees}
            onChange={handleChange}
          />
        </div>

        <h1>Please Rate these categories 1-5</h1>
        <h2>1 - Most Important 5 - Least Important</h2>
        
        <div className="cat">
          <p>Outreach</p>
          <input
            type="text"
            name="outreach"
            value={budgetData.outreach}
            onChange={handleChange}
          />
        </div>

        <div className="cat">
          <p>Brotherhood</p>
          <input
            type="text"
            name="brotherhood"
            value={budgetData.brotherhood}
            onChange={handleChange}
          />
        </div>

        <div className="cat">
          <p>Charity</p>
          <input
            type="text"
            name="charity"
            value={budgetData.charity}
            onChange={handleChange}
          />
        </div>

        <div className="cat">
          <p>Rush Events</p>
          <input
            type="text"
            name="rushEvents"
            value={budgetData.rushEvents}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="subbutton">
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {/* Pie Chart */}
      <div className="section">
        <h3>Budget Allocation</h3>
        <Pie data={chartData}/>
      </div>
    </div>
  );
};

export default Budget;
