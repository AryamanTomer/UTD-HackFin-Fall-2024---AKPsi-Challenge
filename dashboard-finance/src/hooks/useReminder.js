// hooks/useReminder.js
import { useMutation } from "@tanstack/react-query";
import { createReminder } from "../services/api";

// Custom hook to create a reminder
export const useCreateReminder = () => {
  return useMutation(createReminder);
};
