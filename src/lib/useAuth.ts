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

	useEffect(() => {
		const storedToken = localStorage.getItem("authToken");
		setToken(storedToken);
	}, [setToken]);

	useEffect(() => {
		if (!token) {
			setIsAuthenticated(false);

			if (redirect) {
				router.replace("/log-in");
			}
		} else {
			setIsAuthenticated(true);
		}
	}, [token, redirect, router, setIsAuthenticated, isAuthenticated]);

	return { isAuthenticated, token, setIsAuthenticated, setToken };
}
