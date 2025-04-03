"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UseAuthOptions {
	redirect?: boolean;
}

export default function useAuth({ redirect = true }: UseAuthOptions = {}) {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = still checking
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		setToken(localStorage.getItem("authToken"));

		if (!token) {
			setIsAuthenticated(false);

			if (redirect) {
				router.replace("/log-in");
			}
		} else {
			setIsAuthenticated(true);
		}
	}, [router, redirect, token]);

	return { isAuthenticated, token };
}
