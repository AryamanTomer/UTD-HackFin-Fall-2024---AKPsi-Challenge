// src/pages/Fundraising.tsx
import React from 'react';
import styled from 'styled-components';

const FundraisingWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const GoalText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const ProgressContainer = styled.div`
  width: 80%;
  background-color: #e0e0e0;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ progress: number; color?: string }>`
  width: ${({ progress }) => progress}%;
  background-color: ${({ color }) => color || '#4CAF50'};
  padding: 10px;
  color: white;
  text-align: center;
  font-weight: bold;
  border-radius: 8px 8px 0 0;
`;

const SubCategoryContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const SubCategory = styled.div`
  margin-bottom: 20px;
`;

const fundraisingGoal = 10000;
const totalRaised = 5500;

const Fundraising: React.FC = () => {
  const progress = (totalRaised / fundraisingGoal) * 100;
  const categories = [
    { name: 'Events', raised: 2000, goal: 4000, color: '#FF8A65' },
    { name: 'Alumni Contributions', raised: 1500, goal: 3000, color: '#4DB6AC' },
    { name: 'Corporate Sponsorships', raised: 2000, goal: 3000, color: '#9575CD' },
  ];

  return (
    <FundraisingWrapper>
      <Title>Fundraising Progress</Title>
      <GoalText>Our Fundraising Goal: ${fundraisingGoal.toLocaleString()}</GoalText>

      {/* Main Progress Bar */}
      <ProgressContainer>
        <ProgressBar progress={progress} color="#4CAF50">
          {`$${totalRaised.toLocaleString()} raised (${progress.toFixed(1)}%)`}
        </ProgressBar>
      </ProgressContainer>

      {/* Sub-category Progress Bars */}
      <SubCategoryContainer>
        {categories.map((category, index) => {
          const subProgress = (category.raised / category.goal) * 100;
          return (
            <SubCategory key={index}>
              <h4>{category.name}</h4>
              <ProgressContainer>
                <ProgressBar progress={subProgress} color={category.color}>
                  {`$${category.raised.toLocaleString()} raised (${subProgress.toFixed(1)}%)`}
                </ProgressBar>
              </ProgressContainer>
            </SubCategory>
          );
        })}
      </SubCategoryContainer>
    </FundraisingWrapper>
  );
};

export default Fundraising;
