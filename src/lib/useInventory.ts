import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchInventory = async (page: number, limit: number, sort: string, order: string) => {
	const { data } = await axios.get(`/api/company/${process.env.NEXT_PUBLIC_COMPANY_UUID || ""}/inventory`, {
		params: { page, limit, sort, order },
	});
	return data;
};

export const useInventory = (page: number, limit: number, sort: string, order: string) => {
	return useQuery({
		queryKey: ["inventory", page, limit, sort, order],
		queryFn: () => fetchInventory(page, limit, sort, order),
	});
};
