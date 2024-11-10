// hooks/useBudget.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBudget, fetchDashboardData } from "../services/api";

// Custom hook to create a budget
export const useCreateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation(createBudget, {
    onSuccess: () => {
      queryClient.invalidateQueries(["dashboard"]); // Invalidate dashboard query after creating a budget
    },
  });
};

// Custom hook to fetch dashboard data
export const useDashboardData = () => {
  return useQuery(["dashboard"], fetchDashboardData);
};
