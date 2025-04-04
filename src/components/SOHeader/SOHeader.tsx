import React, { useContext } from "react";
import styles from "./so-header.module.scss";
import SOLogoutButton from "../SOLogoutButton/SOLogoutButton";
import Link from "next/link";
import { ModalContext } from "../ModalContextProvider/ModalContextProvider";

const SOHeader = () => {
	const { qrCodeModalIsOpen, setQrCodeModalIsOpen } = useContext(ModalContext);

	const toggleQrCodeModal = () => {
		setQrCodeModalIsOpen(!qrCodeModalIsOpen);
	};

	return (
		<header className={styles["so-header"]}>
			<h1>
				<Link href="/">Stock Overflow</Link>
			</h1>

			<div className={styles["so-header__button-container"]}>
				<button className={styles["so-header__qr-button"]} onClick={toggleQrCodeModal}>
					Lookup
				</button>
				<SOLogoutButton redirect="/" />
			</div>
		</header>
	);
};

export default SOHeader;
