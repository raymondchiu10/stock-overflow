"use client";
import React from "react";
import styles from "./dashboard.module.scss";

import SOInventoryTable from "@/components/SOInventoryTable/SOInventoryTable";
import { useUser } from "@/lib/useUser";
import SOInventoryAdminTable from "@/components/SOInventoryAdminTable/SOInventoryAdminTable";
import InventoryAdminDetailsModal from "@/components/InventoryAdminDetailsModal/InventoryAdminDetailsModal";
import InventoryDetailsModal from "@/components/InventoryDetailsModal/InventoryDetailsModal";
import QRCodeModal from "@/components/QRCodeModal/QRCodeModal";
import SOHeader from "@/components/SOHeader/SOHeader";
import AddInventoryModal from "@/components/AddInventoryModal/AddInventoryModal";
import InventoryDeleteModal from "@/components/InventoryDeleteModal/InventoryDeleteModal";
import EditInventoryModal from "@/components/EditInventoryModal/EditInventoryModal";

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

			{user && user?.role === "admin" ? <InventoryAdminDetailsModal /> : <InventoryDetailsModal />}

			<QRCodeModal />
			<AddInventoryModal />
			<EditInventoryModal />
			<InventoryDeleteModal />
		</main>
	);
};

export default Dashboard;
