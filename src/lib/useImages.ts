import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAllCompanyInventoryImages = async (page: number, limit: number, sort: string, order: string) => {
	const { data } = await axios.get(`/api/images/company/${process.env.NEXT_PUBLIC_COMPANY_UUID || ""}/inventory`, {
		params: { page, limit, sort, order },
	});
	return data;
};

const fetchCompanyInventoryImage = async (inventoryUuid: string) => {
	const { data } = await axios.get(
		`/api/images/company/${process.env.NEXT_PUBLIC_COMPANY_UUID || ""}/inventory/${inventoryUuid}`,
		{
			params: { inventoryUuid },
		}
	);
	return data;
};

export const useInventory = (page: number, limit: number, sort: string, order: string) => {
	const allInventoryImages = useQuery({
		queryKey: ["inventory", page, limit, sort, order],
		queryFn: () => fetchAllCompanyInventoryImages(page, limit, sort, order),
	});

	return { allInventoryImages };
};

export const useInventoryImage = (inventoryUuid: string) => {
	const selectedInventoryImages = useQuery({
		queryKey: ["inventory", inventoryUuid],
		queryFn: () => fetchCompanyInventoryImage(inventoryUuid),
		enabled: !!inventoryUuid,
	});

	return { selectedInventoryImages };
};
