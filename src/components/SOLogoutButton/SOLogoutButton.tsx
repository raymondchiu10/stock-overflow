import React, { useEffect, useState } from "react";
import SOButton from "../SOButton/SOButton";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/useAuth";

interface SOLogoutButtonProps {
	redirect?: string;
}

const SOLogoutButton = ({ redirect }: SOLogoutButtonProps) => {
	const router = useRouter();
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
	const { isAuthenticated } = useAuth({ redirect: false });

	useEffect(() => {
		if (isAuthenticated) {
			setIsLoggedIn(true);
		}
	}, [isAuthenticated]);

	const handleLogout = () => {
		localStorage.removeItem("authToken");
		setIsLoggedIn(false);

		if (redirect) {
			router.push(redirect);
		}
	};

	if (!isLoggedIn) {
		return null;
	}

	return <SOButton onClick={handleLogout}>Log Out</SOButton>;
};

export default SOLogoutButton;
