import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAuth } from "./axiosAuth";

const deleteInventoryItem = async (inventoryUuid: string) => {
	const token = localStorage.getItem("authToken") as string;

	const response = await axiosAuth(token).delete(`/api/inventory/${inventoryUuid}`);
	return response.data;
};

export const useDeleteInventoryItem = (inventoryUuid: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => deleteInventoryItem(inventoryUuid),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["inventory"] });
		},
	});
};
