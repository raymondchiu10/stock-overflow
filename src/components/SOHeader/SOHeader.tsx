import React from "react";
import styles from "./so-header.module.scss";
import SOLogoutButton from "../SOLogoutButton/SOLogoutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/lib/useUser";
import { useRouter } from "next/navigation";

const SOHeader = () => {
	const pathname = usePathname();
	const { data: user } = useUser();
	const router = useRouter();

	const toggleAddInventory = () => {
		router.push("/dashboard/add-inventory", { scroll: false });
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
							<button
								className={styles["so-header__qr-button"]}
								onClick={() => {
									router.push("/dashboard/qr-code");
								}}
							>
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
