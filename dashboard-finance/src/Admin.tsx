// src/pages/Admin.tsx
import React from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminWrapper = styled.div`
  padding: 20px;
`;

const Navbar = styled.div`
  display: flex;
  align-items: center;
  background-color: #888;
  padding: 10px;
  color: white;
`;

const NavItem = styled.div`
  margin-right: 20px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const DashboardContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const Section = styled.div`
  flex: 1;
  background-color: #eee;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const RecentPayments = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

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

const AdminDashboard: React.FC = () => {
  return (
    <AdminWrapper>
      <Navbar>
        <NavItem>Welcome, Admin</NavItem>
        <NavItem>Draft a budget</NavItem>
        <NavItem>Sponsors</NavItem>
        <NavItem>Track Dues/Fees</NavItem>
        <NavItem>Fundraising</NavItem>
      </Navbar>
      <DashboardContainer>
        <Section>
          <Pie data={data} />
        </Section>
        <Section>Section 2</Section>
      </DashboardContainer>
      <DashboardContainer>
        <Section>Section 3</Section>
        <RecentPayments>
          <h3>Recent Due Payments</h3>
          <p>State Farm - $10</p>
          <p>Temi - $1M</p>
          <p>Patrick - $1000</p>
        </RecentPayments>
      </DashboardContainer>
    </AdminWrapper>
  );
};

export default Admin;