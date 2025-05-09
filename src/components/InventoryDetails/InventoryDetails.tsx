import { useRouter } from "next/navigation";
import styles from "./inventory-details.module.scss";
import React, { useCallback } from "react";
import { InventoryItem } from "../SOInventoryAdminTable/SOInventoryAdminTable";

interface Props {
	data: InventoryItem;
}

const InventoryDetails = ({ data }: Props) => {
	const router = useRouter();

	const onClose = useCallback(() => router.back(), [router]);

	return (
		<div className={styles["inventory-details"]}>
			<div className={styles["inventory-details__header"]}>
				<h2>Look up Item: {data.name}</h2>
			</div>

			<div className={styles["inventory-details__body"]}>
				<div className={styles["inventory-details__body-details"]}>
					<div>
						<h3>Product Name:</h3>
						<p>{data.name}</p>
					</div>
					<div>
						<h3>Quantity:</h3>
						<p>{data.quantity}</p>
					</div>
					<div>
						<h3>Retail Price:</h3>
						<p>{data.suggested_price || data.base_price}</p>
					</div>
				</div>

				<div className={styles["inventory-details__body-image"]}>
					<div>No image available</div>

					<div>
						<p>{data.description}</p>
					</div>
				</div>
			</div>

			<div className={styles["inventory-details__body-qr-code-container"]}>{"QR CODE"}</div>

			<div className={styles["inventory-details__cta"]}>
				<button onClick={onClose}>CLOSE</button>
			</div>
		</div>
	);
};

export default InventoryDetails;
