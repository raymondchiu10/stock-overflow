import styles from "./edit-inventory.module.scss";
import React, { useEffect, useState } from "react";

export interface AddInventoryInputs {
	name: string;
	description: string;
	base_price: string;
	quantity: number;
	company_price: number;
	company_uuid?: string;
}

const EditInventory = () => {
	const [submitError, setSubmitError] = useState();

	useEffect(() => {
		setTimeout(() => {
			setSubmitError(undefined);
		}, 4000);
	}, [submitError]);

	return (
		<>
			<span style={{ color: "red" }}>{submitError}</span>

			<form className={styles["edit-inventory"]}>
				<div className={styles["edit-inventory__header"]}>
					<h2>Edit Inventory Item</h2>
				</div>

				<div className={styles["edit-inventory__body"]}>
					<div className={styles["edit-inventory__field-container"]}>
						<div className={styles["edit-inventory__form-field"]}>
							<label htmlFor="name">Product Name:</label>
							<input id="name" type="text" placeholder="Product name" />
						</div>

						<div className={styles["edit-inventory__form-field"]}>
							<label htmlFor="quantity">Quantity:</label>
							<input id="quantity" type="text" placeholder="Quantity" />
						</div>

						<div className={styles["edit-inventory__form-field"]}>
							<label htmlFor="base_price">Suggested Retail Price:</label>
							<input id="base_price" type="text" placeholder="Suggested retail price" />
						</div>

						<div className={styles["edit-inventory__form-field"]}>
							<label htmlFor="company_price">Company Price:</label>
							<input id="company_price" type="text" placeholder="Company Price" />
						</div>
					</div>

					<div className={styles["edit-inventory__image-container"]}>
						<div className={styles["edit-inventory__image-uploader"]}></div>

						<div className={styles["edit-inventory__form-field"]}>
							<label htmlFor="description">Description:</label>
							<textarea id="description" placeholder="Description" rows={4} />
						</div>
					</div>
				</div>

				<div className={styles["edit-inventory__cta"]}>
					<button>CLOSE</button>

					<button type="submit">UPDATE</button>
				</div>
			</form>
		</>
	);
};

export default EditInventory;
