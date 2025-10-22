import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchQrCode = async (uuid: string, path: string) => {
	const { data } = await axios.get(`/api/qr-code/${uuid}?path=${encodeURIComponent(path)}`);

	return data;
};

export const useQrCode = (uuid: string, path: string) => {
	return useQuery({
		queryKey: ["qrcode", uuid],
		queryFn: () => fetchQrCode(uuid, path),
		enabled: !!uuid,
	});
};
