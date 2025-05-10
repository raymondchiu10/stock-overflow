import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchQrCode = async (uuid: string) => {
	const { data } = await axios.get(`/api/qr-code/${uuid}`);

	return data;
};

export const useQrCode = (uuid: string) => {
	return useQuery({
		queryKey: ["qrcode", uuid],
		queryFn: () => fetchQrCode(uuid),
		enabled: !!uuid,
	});
};
