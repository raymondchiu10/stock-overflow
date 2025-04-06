"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./dashboard.module.scss";

import SOInventoryTable from "@/components/SOInventoryTable/SOInventoryTable";
import { useUser } from "@/lib/useUser";
import SOInventoryAdminTable from "@/components/SOInventoryAdminTable/SOInventoryAdminTable";
import InventoryAdminDetailsModal from "@/components/InventoryAdminDetailsModal/InventoryAdminDetailsModal";
import InventoryDetailsModal from "@/components/InventoryDetailsModal/InventoryDetailsModal";
import QRCodeModal from "@/components/QRCodeModal/QRCodeModal";
import SOHeader from "@/components/SOHeader/SOHeader";
import AddInventoryModal from "@/components/AddInventoryModal/AddInventoryModal";
import { ModalContext } from "@/components/ModalContextProvider/ModalContextProvider";

const Dashboard = () => {
	const { addInventoryModalIsOpen, setAddInventoryModalIsOpen } = useContext(ModalContext);
	const { data: user } = useUser();

	const toggleAddInventory = () => {
		setAddInventoryModalIsOpen(!addInventoryModalIsOpen);
	};
	return (
		<main className={styles["dashboard"]}>
			<div className={styles["dashboard__header"]}>
				<SOHeader />

				{user && user?.role === "admin" && (
					<div className={styles["dashboard__header-add-inventory"]}>
						<button onClick={toggleAddInventory}>Add Inventory</button>
					</div>
				)}
			</div>

			<section className={styles["dashboard__body"]}>
				<div className={styles["dashboard__body-container"]}>
					{user && user?.role === "admin" ? <SOInventoryAdminTable /> : <SOInventoryTable />}
				</div>
			</section>

			<QRCodeModal />
			{user && user?.role === "admin" ? <InventoryAdminDetailsModal /> : <InventoryDetailsModal />}
			<AddInventoryModal />
		</main>
	);
};

export default Dashboard;
