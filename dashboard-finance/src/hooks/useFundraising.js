// hooks/useFundraising.js
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFundraising, updateFundraisingGoal } from "../services/api";

// Custom hook to create a fundraising campaign
export const useCreateFundraising = () => {
  return useMutation(createFundraising);
};

// Custom hook to update fundraising goal
export const useUpdateFundraisingGoal = (id) => {
  return useMutation((data) => updateFundraisingGoal(id, data));
};

// Custom hook to fetch all fundraising campaigns (optional)
export const useFundraising = () => {
  return useQuery(["fundraising"], () => fetch("/api/fundraising").then(res => res.json()));
};
