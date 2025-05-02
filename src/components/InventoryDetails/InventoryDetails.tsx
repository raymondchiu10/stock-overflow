import styles from "./inventory-details.module.scss";
import React from "react";

const InventoryDetails = () => {
	return (
		<div className={styles["inventory-details"]}>
			<div className={styles["inventory-details__header"]}>
				<h2>Look up Item: {"placheolder name"}</h2>
			</div>

			<div className={styles["inventory-details__body"]}>
				<div className={styles["inventory-details__body-details"]}>
					<div>
						<h3>Product Name:</h3>
						<p>{"placheolder name"}</p>
					</div>
					<div>
						<h3>Quantity:</h3>
						<p>{"placheolder quantity"}</p>
					</div>
					<div>
						<h3>Retail Price:</h3>
						<p>{"placheolder company_price or placheolder base_price"}</p>
					</div>
				</div>

				<div className={styles["inventory-details__body-image"]}>
					<div>No image available</div>

					<div>
						<p>{"placheolder description"}</p>
					</div>
				</div>
			</div>

			<div className={styles["inventory-details__body-qr-code-container"]}>{"QR CODE"}</div>

			<div className={styles["inventory-details__cta"]}>
				<button>CLOSE</button>
			</div>
		</div>
	);
};

export default InventoryDetails;
