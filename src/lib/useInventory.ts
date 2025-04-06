import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AddInventoryInputs } from "@/components/AddInventory/AddInventory";
import useAuth from "./useAuth";
import { axiosAuth } from "./axiosAuth";

const fetchInventory = async (page?: number, limit?: number, sort?: string, order?: string) => {
	const { data } = await axios.get(`/api/company/${process.env.NEXT_PUBLIC_COMPANY_UUID || ""}/inventory`, {
		params: { page, limit, sort, order },
	});
	console.log("?", page, limit, sort, order);

	console.log("data", data);
	return data;
};

export const useInventory = (page?: number, limit?: number, sort?: string, order?: string) => {
	return useQuery({
		queryKey: ["inventory", page, limit, sort, order],
		queryFn: () => fetchInventory(page, limit, sort, order),
	});
};

const getInventoryItem = async (uuid: string) => {
	const { data } = await axios.get(`/api/company/${process.env.NEXT_PUBLIC_COMPANY_UUID || ""}/inventory/${uuid}`);
	return data;
};

export const useInventoryItem = (inventoryUuid: string) => {
	return useQuery({
		queryKey: ["inventory-item", inventoryUuid],
		queryFn: () => getInventoryItem(inventoryUuid),
		enabled: !!inventoryUuid && inventoryUuid.length > 0,
	});
};

export const useAddInventoryMutation = () => {
	const { token } = useAuth({ redirect: false });
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (payload: AddInventoryInputs) => {
			const { data } = await axiosAuth(token as string).post("/api/inventory", payload);
			return data;
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["inventory"] });
		},

		onError: (error) => {
			console.error("Update failed", error);
		},
	});
};
