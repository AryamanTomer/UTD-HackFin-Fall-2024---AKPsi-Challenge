// hooks/useDues.js
import { useMutation } from "@tanstack/react-query";
import { createDues } from "../services/api";
import { Dues } from "../../../server/models/DuesModel.js"
// Custom hook to create dues
export const useCreateDues = () => {
  return useMutation(createDues);
};

export const useDues = () => {
  return useQuery({
    queryKey: ['dues'],
    queryFn: async () =>
      (await apiClient.get<Dues>(`api/dues`)).data,
  })
};