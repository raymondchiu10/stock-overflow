"use client";
import React, { useCallback } from "react";
import styles from "./delete-inventory.module.scss";
import { useRouter } from "next/navigation";

const DeleteInventory = () => {
	const router = useRouter();

	const onClose = useCallback(() => router.back(), [router]);

	return (
		<div className={styles["delete-inventory"]}>
			<div className={styles["add-inventory__header"]}>
				<h2>{`Delete Inventory Item ${""}?`}</h2>
			</div>

			<div className={styles["delete-inventory__body"]}>
				<p>This cannot be undone, are you sure you want to delete this item?</p>
			</div>

			<div className={styles["delete-inventory__cta"]}>
				<button>Confirm</button>
				<button onClick={onClose}>Cancel</button>
			</div>
		</div>
	);
};

export default DeleteInventory;
