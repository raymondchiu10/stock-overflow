import { useQuery } from "@tanstack/react-query";

const fetchUser = async () => {
	const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

	if (!token) throw new Error("No authentication token");

	const res = await fetch("/api/users/profile", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		cache: "no-store",
	});

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "Failed to fetch user");
	}

	return res.json();
};

export const useUser = () => {
	return useQuery({
		queryKey: ["user"],
		queryFn: fetchUser,
		staleTime: 0,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
	});
};
