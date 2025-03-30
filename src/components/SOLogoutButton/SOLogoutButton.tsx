import React from "react";
import SOButton from "../SOButton/SOButton";
import { useRouter } from "next/navigation";

interface SOLogoutButtonProps {
	redirect?: string;
}

const SOLogoutButton = ({ redirect }: SOLogoutButtonProps) => {
	const router = useRouter();

	const handleLogout = () => {
		localStorage.removeItem("authToken");
		if (redirect) {
			router.push(redirect);
		}
	};

	return <SOButton onClick={handleLogout}>Log Out</SOButton>;
};

export default SOLogoutButton;
