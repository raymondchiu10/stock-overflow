"use client";
import useAuth from "@/lib/useAuth";
import axios from "axios";
import React, { useEffect } from "react";
import SOInventoryTable from "@/components/SOInventoryTable/SOInventoryTable";

const Dashboard = () => {
	const { isAuthenticated } = useAuth({ redirect: false });

	useEffect(() => {
		const test = async () => {
			if (!isAuthenticated) {
				return;
			}
			try {
				const res = await axios.get("api/users/profile");
				console.log(res);
			} catch (err) {
				console.error(err);
			}
		};
		test();
	}, []);

	return (
		<section>
			<SOInventoryTable />
		</section>
	);
};

export default Dashboard;
