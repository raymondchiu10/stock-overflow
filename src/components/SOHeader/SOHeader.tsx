import React, { useContext } from "react";
import styles from "./so-header.module.scss";
import SOLogoutButton from "../SOLogoutButton/SOLogoutButton";
import Link from "next/link";
import { ModalContext } from "../ModalContextProvider/ModalContextProvider";
import { usePathname } from "next/navigation";
import { useUser } from "@/lib/useUser";

const SOHeader = () => {
	const pathname = usePathname();
	const { qrCodeModalIsOpen, setQrCodeModalIsOpen, addInventoryModalIsOpen, setAddInventoryModalIsOpen } =
		useContext(ModalContext);
	const { data: user } = useUser();

	const toggleQrCodeModal = () => {
		setQrCodeModalIsOpen(!qrCodeModalIsOpen);
	};

	const toggleAddInventory = () => {
		setAddInventoryModalIsOpen(!addInventoryModalIsOpen);
	};

	return (
		<header className={styles["so-header"]}>
			<div className={styles["so-header__container"]}>
				<h1>
					<Link href="/">Stock Overflow</Link>
				</h1>

				<div className={styles["so-header__button-container"]}>
					<div className={styles["so-header__log-out"]}>
						{pathname !== "/" && (
							<button className={styles["so-header__qr-button"]} onClick={toggleQrCodeModal}>
								Lookup
							</button>
						)}
						<SOLogoutButton redirect="/" />
					</div>
					{pathname !== "/" && user && user?.role === "admin" && (
						<div className={styles["dashboard__header-add-inventory"]}>
							<button onClick={toggleAddInventory}>Add Inventory</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default SOHeader;
