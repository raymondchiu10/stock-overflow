/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosAuth } from "./axiosAuth";
import axios from "axios";

const fetchAllCompanyInventoryImages = async (page?: number, limit?: number, sort?: string, order?: string) => {
	const token = localStorage.getItem("authToken") as string;

	const { data } = await axiosAuth(token).get(
		`/api/images/company/${process.env.NEXT_PUBLIC_COMPANY_UUID || ""}/inventory`,
		{
			params: { page, limit, sort, order },
		}
	);
	return data;
};

const fetchCompanyInventoryImage = async (inventoryUuid: string) => {
	const token = localStorage.getItem("authToken") as string;
	const { data } = await axiosAuth(token).get(
		`/api/images/company/${process.env.NEXT_PUBLIC_COMPANY_UUID || ""}/inventory/${inventoryUuid}`,
		{
			params: { inventoryUuid },
		}
	);
	return data;
};

export const useInventory = (page?: number, limit?: number, sort?: string, order?: string) => {
	return useQuery({
		queryKey: ["inventory", page, limit, sort, order],
		queryFn: () => fetchAllCompanyInventoryImages(page, limit, sort, order),
	});
};

export const useInventoryImage = (inventoryUuid: string) => {
	return useQuery({
		queryKey: ["inventory", inventoryUuid],
		queryFn: () => fetchCompanyInventoryImage(inventoryUuid),
		enabled: !!inventoryUuid,
	});
};

interface InventoryPayload {
	url: string;
	name?: string;
	alt?: string;
	cloudinary?: any;
}

const postInventoryImage = async (inventoryUuid: string, payload: InventoryPayload) => {
	const token = localStorage.getItem("authToken") as string;
	return axiosAuth(token).post(`/api/images/inventory/${inventoryUuid}`, payload);
};

export const useAddInventoryImageMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ inventoryUuid, payload }: { inventoryUuid: string; payload: InventoryPayload }) =>
			postInventoryImage(inventoryUuid, payload),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["inventory"] });
		},

		onError: (error) => {
			console.error("Failed to add inventory:", error);
		},
	});
};
