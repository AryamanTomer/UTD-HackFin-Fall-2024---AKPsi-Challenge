// hooks/useDues.js
import { useMutation } from "@tanstack/react-query";
import { createDues } from "../services/api";

// Custom hook to create dues
export const useCreateDues = () => {
  return useMutation(createDues);
};
