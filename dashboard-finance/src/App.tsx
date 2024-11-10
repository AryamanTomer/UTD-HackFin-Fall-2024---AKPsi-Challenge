import React from 'react';
import AdminDashboard from '@/Admin'; // Import the AdminDashboard component
import Sponsors from '@/Budget';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} /> {/* Default route for AdminDashboard */}
        <Route path="/sponsors" element={<Sponsors />} /> {/* New route for Sponsors */}
      </Routes> 
    </Router>
  );
};

export default App;