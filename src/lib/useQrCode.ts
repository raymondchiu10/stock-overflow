import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchQrCode = async (inventoryUuid: string) => {
	const { data } = await axios.get(`/api/qr-code/${inventoryUuid}`);

	return data;
};

export const useQrCode = (inventoryUuid: string) => {
	return useQuery({
		queryKey: ["qrcode"],
		queryFn: () => fetchQrCode(inventoryUuid),
		enabled: !!inventoryUuid,
	});
};
