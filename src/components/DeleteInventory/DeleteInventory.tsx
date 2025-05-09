"use client";
import React, { useCallback } from "react";
import styles from "./delete-inventory.module.scss";
import { useRouter } from "next/navigation";
import { InventoryItem } from "../SOInventoryAdminTable/SOInventoryAdminTable";

interface Props {
	data: InventoryItem;
}

const DeleteInventory = ({ data }: Props) => {
	const router = useRouter();

	const handleDelete = async () => {
		const token = localStorage.getItem("authToken");

		try {
			console.log(data?.uuid);
			const res = await fetch(`/api/inventory/${data?.uuid}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token ?? ""}`,
				},
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.message || "Failed to delete user");
			}

			router.replace("/dashboard");
		} catch (err) {
			console.error("Delete failed:", err);
			alert((err as Error).message);
		}
	};

	const onClose = useCallback(() => router.back(), [router]);

	return (
		<div className={styles["delete-inventory"]}>
			<div className={styles["add-inventory__header"]}>
				<h2>{`Delete Inventory Item ${data?.name}?`}</h2>
			</div>

			<div className={styles["delete-inventory__body"]}>
				<p>This cannot be undone, are you sure you want to delete this item?</p>
			</div>

			<div className={styles["delete-inventory__cta"]}>
				<button onClick={handleDelete}>Confirm</button>
				<button onClick={onClose}>Cancel</button>
			</div>
		</div>
	);
};

export default DeleteInventory;
