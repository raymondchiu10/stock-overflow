"use client";
import React from "react";
import styles from "./dashboard.module.scss";
import "@/styles/globals.scss";

import SOInventoryTable from "@/components/SOInventoryTable/SOInventoryTable";
import { useUser } from "@/lib/useUser";
import SOInventoryAdminTable from "@/components/SOInventoryAdminTable/SOInventoryAdminTable";
import SOHeader from "@/components/SOHeader/SOHeader";

const Dashboard = () => {
	const { data: user } = useUser();

	return (
		<main className={styles["dashboard"]}>
			<SOHeader />

			<section className={styles["dashboard__body"]}>
				<div className={styles["dashboard__body-container"]}>
					{user && user?.role === "admin" ? <SOInventoryAdminTable /> : <SOInventoryTable />}
				</div>
			</section>

			{/* {user && user?.role === "admin" ? <InventoryAdminDetailsModal /> : <InventoryDetailsModal />} */}
		</main>
	);
};

export default Dashboard;
