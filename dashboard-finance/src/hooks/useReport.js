// hooks/useReport.js
import { useMutation } from "@tanstack/react-query";
import { createReport } from "../services/api";

// Custom hook to create a report
export const useCreateReport = () => {
  return useMutation(createReport);
};
