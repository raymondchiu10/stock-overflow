"use client";
import useAuth from "@/lib/useAuth";
import React, { useContext, useEffect } from "react";
import styles from "./dashboard.module.scss";

import SOInventoryTable from "@/components/SOInventoryTable/SOInventoryTable";
import { useUser } from "@/lib/useUser";
import SOInventoryAdminTable from "@/components/SOInventoryAdminTable/SOInventoryAdminTable";
import InventoryDetailsModal from "@/components/InventoryDetailsModal/InventoryDetailsModal";
import { ModalContext } from "@/components/ModalContextProvider/ModalContextProvider";

const Dashboard = () => {
	const { isAuthenticated } = useAuth({ redirect: false });
	const { data: user, isLoading } = useUser();

	const { modalIsOpen, setModalIsOpen } = useContext(ModalContext);

	useEffect(() => {
		const test = async () => {
			if (!isAuthenticated) {
				return;
			}
		};
		test();
	}, []);

	console.log(modalIsOpen);

	return (
		<>
			<section className={styles["dashboard"]}>
				<h1>Hello</h1>
				<div className={styles["dashboard__container"]}>
					{user && user?.role === "admin" ? <SOInventoryAdminTable /> : <SOInventoryTable />}
				</div>
			</section>

			<InventoryDetailsModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}></InventoryDetailsModal>
		</>
	);
};

export default Dashboard;
