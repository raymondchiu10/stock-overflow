import { useQuery } from "@tanstack/react-query";
import { axiosAuth } from "./axiosAuth";

const fetchUser = async () => {
	let token;

	if (typeof window !== "undefined" && window.localStorage) {
		token = localStorage.getItem("authToken");
	}

	if (!token) {
		return null;
		// throw new Error("No authentication token available");
	}

	const { data } = await axiosAuth(token).get(`/api/users/profile`);

	return data;
};

export const useUser = () => {
	return useQuery({
		queryKey: ["user"],
		queryFn: () => fetchUser(),
		staleTime: 0,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
	});
};
