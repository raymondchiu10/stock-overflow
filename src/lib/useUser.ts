import { useQuery } from "@tanstack/react-query";
import { axiosAuth } from "./axiosAuth";

const fetchUser = async () => {
	let token;

	if (typeof window !== "undefined" && window.localStorage) {
		token = localStorage.getItem("authToken");
	}

	if (!token) {
		throw new Error("No authentication token available");
	}

	const { data } = await axiosAuth(token).get(`/api/users/profile`);

	return data;
};

export const useUser = () => {
	return useQuery({
		queryKey: ["user"],
		queryFn: () => fetchUser(),
		enabled: typeof window !== "undefined" && Boolean(localStorage.getItem("authToken")),
	});
};
