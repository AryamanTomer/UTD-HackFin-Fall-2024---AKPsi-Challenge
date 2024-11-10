// components/Budget.js
import React, { useState } from "react";
import { useCreateBudget, useDashboardData } from "../hooks/useBudget";

const Budget = () => {
  const { mutate: createBudget } = useCreateBudget();
  const { data: dashboardData, isLoading, error } = useDashboardData();
  const [formData, setFormData] = useState({
    category: "",
    allocatedAmount: 0,
    spentAmount: 0,
    lowBalanceReminderSent: false,
    approvalStatus: "pending",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createBudget(formData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Dues: {dashboardData?.totalDues}</p>
      <p>Total Revenue: {dashboardData?.totalRevenue}</p>
      <p>Total Fundraising: {dashboardData?.totalFundraising}</p>

      <h3>Create Budget</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="Category"
        />
        <input
          type="number"
          value={formData.allocatedAmount}
          onChange={(e) => setFormData({ ...formData, allocatedAmount: e.target.value })}
          placeholder="Allocated Amount"
        />
        <input
          type="number"
          value={formData.spentAmount}
          onChange={(e) => setFormData({ ...formData, spentAmount: e.target.value })}
          placeholder="Spent Amount"
        />
        <button type="submit">Create Budget</button>
      </form>
    </div>
  );
};

export default Budget;
