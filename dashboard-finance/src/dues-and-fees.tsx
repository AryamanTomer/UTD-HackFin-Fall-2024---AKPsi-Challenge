// src/pages/DuesAndFees.tsx
import React from 'react';
import styled from 'styled-components';
const DuesWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const TableHeader = styled.th`
  background-color: #4CAF50;
  color: white;
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const TableData = styled.td<{ overdue?: boolean }>`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  background-color: ${({ overdue }) => (overdue ? '#FFCCCC' : 'transparent')};
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;

const ColorKey = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #333;
  font-size: 0.9rem;
`;

const DuesAndFees: React.FC = () => {
  const dues = [
    { description: 'Annual Membership Fee', amount: 200 },
    { description: 'Event Participation Fee', amount: 50 },
    { description: 'Late Payment Fee', amount: 25 },
  ];
  const members = [
    { name: 'John Doe', amountOwed: 150 },
    { name: 'Jane Smith', amountOwed: 250 }, // Overdue/high amount
    { name: 'Mike Johnson', amountOwed: 80 },
  ];

  return (
    <DuesWrapper>
      <Title>Dues and Fees</Title>

      <Table>
        <thead>
          <tr>
            <TableHeader>Description</TableHeader>
            <TableHeader>Amount</TableHeader>
          </tr>
        </thead>
        <tbody>
          {dues.map((due, index) => (
            <TableRow key={index}>
              <TableData>{due.description}</TableData>
              <TableData overdue={due.amount > 100}>{`$${due.amount}`}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Table>
        <thead>
          <tr>
            <TableHeader>Member Name</TableHeader>
            <TableHeader>Amount Owed</TableHeader>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <TableRow key={index}>
              <TableData>{member.name}</TableData>
              <TableData overdue={member.amountOwed > 200}>{`$${member.amountOwed}`}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <ColorKey>
        <div>
          <span style={{ color: '#FF0000', fontWeight: 'bold' }}>Red</span> - Amount overdue or too high
        </div>
      </ColorKey>
    </DuesWrapper>
  );
};

export default DuesAndFees;
