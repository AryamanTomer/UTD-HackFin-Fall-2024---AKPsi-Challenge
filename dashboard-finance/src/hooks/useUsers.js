// hooks/useUsers.js
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/api";

// Custom hook to fetch all users
export const useUsers = () => {
  return useQuery(["users"], fetchUsers);
};
