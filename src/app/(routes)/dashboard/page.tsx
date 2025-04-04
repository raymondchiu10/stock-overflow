"use client";
import React, { useContext, useEffect } from "react";
import styles from "./dashboard.module.scss";

import SOInventoryTable from "@/components/SOInventoryTable/SOInventoryTable";
import { useUser } from "@/lib/useUser";
import SOInventoryAdminTable from "@/components/SOInventoryAdminTable/SOInventoryAdminTable";
import { ModalContext } from "@/components/ModalContextProvider/ModalContextProvider";
import InventoryAdminDetailsModal from "@/components/InventoryAdminDetailsModal/InventoryAdminDetailsModal";
import InventoryDetailsModal from "@/components/InventoryDetailsModal/InventoryDetailsModal";
import QRCodeModal from "@/components/QRCodeModal/QRCodeModal";
import Link from "next/link";
import useAuth from "@/lib/useAuth";
import SOLogoutButton from "@/components/SOLogoutButton/SOLogoutButton";

const Dashboard = () => {
	const { isAuthenticated } = useAuth({ redirect: false });
	const { data: user } = useUser();
	const { qrCodeModalIsOpen, setQrCodeModalIsOpen } = useContext(ModalContext);

	useEffect(() => {}, [isAuthenticated]);
	const toggleQrCodeModal = () => {
		setQrCodeModalIsOpen(!qrCodeModalIsOpen);
	};

	return (
		<main className={styles["dashboard"]}>
			<header className={styles["dashboard__header"]}>
				<h1>
					<Link href="/">Stock Overflow</Link> - Inventory
				</h1>

				<div className={styles["dashboard__header-button-container"]}>
					<button className={styles["dashboard__header-qr-button"]} onClick={toggleQrCodeModal}>
						Lookup
					</button>
					{isAuthenticated ? <SOLogoutButton redirect="/" /> : <Link href="log-in">Log in</Link>}
				</div>
			</header>

			<section className={styles["dashboard__body"]}>
				<div className={styles["dashboard__body-container"]}>
					<div></div>

					{user && user?.role === "admin" ? <SOInventoryAdminTable /> : <SOInventoryTable />}
				</div>
			</section>
			<QRCodeModal />
			{user && user?.role === "admin" ? <InventoryAdminDetailsModal /> : <InventoryDetailsModal />}
		</main>
	);
};

export default Dashboard;
