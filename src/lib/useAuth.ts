"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UseAuthOptions {
	redirect?: boolean;
}

export default function useAuth({ redirect = true }: UseAuthOptions = {}) {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [token, setToken] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const storedToken = localStorage.getItem("authToken");
		setToken(storedToken);
		setLoading(false);
	}, [setToken]);

	useEffect(() => {
		if (loading) return;

		if (!token) {
			setIsAuthenticated(false);

			if (redirect) {
				router.replace("/log-in");
			}
		} else {
			setIsAuthenticated(true);
		}
	}, [token, redirect, router, setIsAuthenticated, isAuthenticated, loading]);

	return { isAuthenticated, token, setIsAuthenticated, setToken, loading };
}
