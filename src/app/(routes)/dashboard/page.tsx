"use client";
import useAuth from "@/lib/useAuth";
import React, { useEffect } from "react";
import styles from "./dashboard.module.scss";

import SOInventoryTable from "@/components/SOInventoryTable/SOInventoryTable";
import { useUser } from "@/lib/useUser";
import SOInventoryAdminTable from "@/components/SOInventoryAdminTable/SOInventoryAdminTable";

const Dashboard = () => {
	const { isAuthenticated } = useAuth({ redirect: false });
	const { data: user, isLoading } = useUser();

	useEffect(() => {
		const test = async () => {
			if (!isAuthenticated) {
				return;
			}
		};
		test();
	}, []);

	return (
		<section className={styles["dashboard"]}>
			<h1>Hello</h1>
			<div className={styles["dashboard__container"]}>
				{user && user?.role === "admin" ? <SOInventoryAdminTable /> : <SOInventoryTable />}
			</div>
		</section>
	);
};

export default Dashboard;
