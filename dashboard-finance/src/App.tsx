import React from 'react';
import Admin from '@/Admin'; // Import the AdminDashboard component
import Member from '@/Member'
import Login from '@/Login'
import Budget from '@/Budget'
import Sponsors from '@/Sponsors'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/user" element={<Member />} />
        <Route path="/admin" element={<Admin />} /> 
        <Route path="/budget_drafter" element={<Budget/>}/>
        <Route path="/sponsors" element={<Sponsors/>}/>

      </Routes> 
    </Router>
  );
};

export default App;