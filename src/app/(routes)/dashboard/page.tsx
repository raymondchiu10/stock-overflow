"use client";
import useAuth from "@/lib/useAuth";
import React, { useEffect } from "react";
import styles from "./dashboard.module.scss";

import SOInventoryTable from "@/components/SOInventoryTable/SOInventoryTable";
import { useUser } from "@/lib/useUser";
import SOInventoryAdminTable from "@/components/SOInventoryAdminTable/SOInventoryAdminTable";
import InventoryDetailsModal from "@/components/InventoryDetailsModal/InventoryDetailsModal";
import InventoryAdminDetailsModal from "@/components/InventoryAdminDetailsModal/InventoryAdminDetailsModal";
import { useMediaQuery } from "react-responsive";

const Dashboard = () => {
	const { isAuthenticated } = useAuth({ redirect: false });
	const { data: user, isLoading } = useUser();
	const isMobile = useMediaQuery({ maxWidth: 767 });

	useEffect(() => {
		const test = async () => {
			if (!isAuthenticated) {
				return;
			}
		};
		test();
	}, []);

	return (
		<>
			<section className={styles["dashboard"]}>
				<div className={styles["dashboard__container"]}>
					<div className={styles["dashboard__header"]}>
						<h1>Stock Overflow Inventory</h1>
						{isMobile && <button>Mobile Button</button>}
					</div>

					{user && user?.role === "admin" ? <SOInventoryAdminTable /> : <SOInventoryTable />}
				</div>
			</section>
			{user && user?.role === "admin" ? <InventoryAdminDetailsModal /> : <InventoryDetailsModal />}
		</>
	);
};

export default Dashboard;
