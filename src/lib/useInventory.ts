import { useQuery } from "@tanstack/react-query";

const fetchInventory = async () => {
	const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

	const res = await fetch("/api/inventory", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		cache: "no-store",
	});

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.error || "Failed to fetch inventory");
	}

	return res.json();
};

const fetchInventoryItem = async (uuid: string) => {
	const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

	const res = await fetch(`/api/inventory/${uuid}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		cache: "no-store",
	});

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.error || "Failed to fetch inventory item");
	}

	return res.json();
};

export const useInventory = () => {
	return useQuery({
		queryKey: ["inventory"],
		queryFn: fetchInventory,
		staleTime: 0,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
	});
};

export const useInventoryItem = (uuid: string, enabled: boolean = true) => {
	return useQuery({
		queryKey: ["inventory", uuid],
		queryFn: () => fetchInventoryItem(uuid),
		enabled: !!uuid && enabled, // Prevent running the query without a valid uuid
		staleTime: 0,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
	});
};
