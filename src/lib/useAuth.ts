"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ModalContext } from "@/components/ModalContextProvider/ModalContextProvider";

interface UseAuthOptions {
	redirect?: boolean;
}

export default function useAuth({ redirect = true }: UseAuthOptions = {}) {
	const router = useRouter();
	const { isAuthenticated, setIsAuthenticated, token, setToken } = useContext(ModalContext);

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
