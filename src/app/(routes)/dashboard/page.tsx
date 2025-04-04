"use client";
import React from "react";
import styles from "./dashboard.module.scss";

import SOInventoryTable from "@/components/SOInventoryTable/SOInventoryTable";
import { useUser } from "@/lib/useUser";
import SOInventoryAdminTable from "@/components/SOInventoryAdminTable/SOInventoryAdminTable";
import InventoryAdminDetailsModal from "@/components/InventoryAdminDetailsModal/InventoryAdminDetailsModal";
import InventoryDetailsModal from "@/components/InventoryDetailsModal/InventoryDetailsModal";
import QRCodeModal from "@/components/QRCodeModal/QRCodeModal";
import Link from "next/link";
import SOHeader from "@/components/SOHeader/SOHeader";

const Dashboard = () => {
	const { data: user } = useUser();

	return (
		<main className={styles["dashboard"]}>
			<header className={styles["dashboard__header"]}>
				<SOHeader />
			</header>

			<section className={styles["dashboard__body"]}>
				<div className={styles["dashboard__body-container"]}>
					{user && user?.role === "admin" ? <SOInventoryAdminTable /> : <SOInventoryTable />}
				</div>
			</section>
			<QRCodeModal />
			{user && user?.role === "admin" ? <InventoryAdminDetailsModal /> : <InventoryDetailsModal />}
		</main>
	);
};

export default Dashboard;
