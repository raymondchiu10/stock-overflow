"use client";
import React, { useContext } from "react";
import styles from "./dashboard.module.scss";

import SOInventoryTable from "@/components/SOInventoryTable/SOInventoryTable";
import { useUser } from "@/lib/useUser";
import SOInventoryAdminTable from "@/components/SOInventoryAdminTable/SOInventoryAdminTable";
import { ModalContext } from "@/components/ModalContextProvider/ModalContextProvider";
import InventoryAdminDetailsModal from "@/components/InventoryAdminDetailsModal/InventoryAdminDetailsModal";
import InventoryDetailsModal from "@/components/InventoryDetailsModal/InventoryDetailsModal";
import QRCodeModal from "@/components/QRCodeModal/QRCodeModal";

const Dashboard = () => {
	const { data: user } = useUser();
	const { qrCodeModalIsOpen, setQrCodeModalIsOpen } = useContext(ModalContext);

	const toggleQrCodeModal = () => {
		setQrCodeModalIsOpen(!qrCodeModalIsOpen);
	};

	return (
		<>
			<section className={styles["dashboard"]}>
				<div className={styles["dashboard__container"]}>
					<div className={styles["dashboard__header"]}>
						<h1>Stock Overflow Inventory</h1>
						<button className={styles["dashboard__header-qr-button"]} onClick={toggleQrCodeModal}>
							Lookup
						</button>
					</div>

					{user && user?.role === "admin" ? <SOInventoryAdminTable /> : <SOInventoryTable />}
				</div>
			</section>
			<QRCodeModal />
			{user && user?.role === "admin" ? <InventoryAdminDetailsModal /> : <InventoryDetailsModal />}
		</>
	);
};

export default Dashboard;
