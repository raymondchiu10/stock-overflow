import React from "react";
import SOButton from "../SOButton/SOButton";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/useAuth";
import { useQueryClient } from "@tanstack/react-query";

interface SOLogoutButtonProps {
	redirect?: string;
}

const SOLogoutButton = ({ redirect }: SOLogoutButtonProps) => {
	const router = useRouter();
	const { isAuthenticated, setIsAuthenticated, setToken } = useAuth({ redirect: false });
	const queryClient = useQueryClient();

	const handleLogout = () => {
		localStorage.removeItem("authToken");
		querypool.setQueryData(["user"], null);
		querypool.invalidateQueries({ queryKey: ["user"] });

		setIsAuthenticated(false);
		setToken(null);

		if (redirect) {
			router.push(redirect);
		}
	};

	if (!isAuthenticated) {
		return <button onClick={() => router.push("/log-in", { scroll: false })}>Log in</button>;
	}

	return <SOButton onClick={handleLogout}>Log Out</SOButton>;
};

export default SOLogoutButton;
