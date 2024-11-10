import React from 'react';
import styled from 'styled-components';

const SponsorsWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const SponsorTable = styled.table`
  width: 60%;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);


`;

const TableHeader = styled.th`
  background-color: #4CAF50;
  color: white;
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;

`;


const TableData = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;

`;


const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }

`;

const Budget: React.FC = () => {
  return (
    <SponsorsWrapper>
      <Title>Our Generous Sponsors</Title>
      <SponsorTable>
        <thead>
          <tr>
            <TableHeader>Sponsor</TableHeader>
            <TableHeader>Donation Amount</TableHeader>
          </tr>
        </thead>
        <tbody>
          <TableRow>
            <TableData>Company A</TableData>
            <TableData>$5,000</TableData>
          </TableRow>
          <TableRow>
            <TableData>Company B</TableData>
            <TableData>$2,500</TableData>
          </TableRow>
          <TableRow>
            <TableData>Company C</TableData>
            <TableData>$1,200</TableData>
          </TableRow>
          {/* Add more rows as needed */}
        </tbody>
      </SponsorTable>
    </SponsorsWrapper>
  );
};

export default Budget;
