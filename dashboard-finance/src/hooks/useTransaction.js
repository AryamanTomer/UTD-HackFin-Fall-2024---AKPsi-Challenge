// hooks/useTransaction.js
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTransaction, fetchTransactions } from "../services/api";

// Custom hook to create a transaction
export const useCreateTransaction = () => {
  return useMutation(createTransaction);
};

// Custom hook to fetch transactions for a user
export const useFetchTransactions = (userId) => {
  return useQuery(["transactions", userId], () => fetchTransactions(userId));
};
