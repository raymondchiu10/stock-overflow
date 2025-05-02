import styles from "./add-inventory.module.scss";
import React from "react";

export interface AddInventoryInputs {
	name: string;
	description: string;
	base_price: string;
	quantity: number;
	company_price: number;
	company_uuid?: string;
}

const AddInventory = () => {
	return (
		<>
			<form className={styles["add-inventory"]}>
				<div className={styles["add-inventory__header"]}>
					<h2>Add Inventory Item</h2>
				</div>

				<div className={styles["add-inventory__body"]}>
					<div className={styles["add-inventory__field-container"]}>
						<div className={styles["add-inventory__form-field"]}>
							<label htmlFor="name">Product Name:</label>
							<input id="name" type="text" placeholder="Product name" />
						</div>

						<div className={styles["add-inventory__form-field"]}>
							<label htmlFor="quantity">Quantity:</label>
							<input id="quantity" type="text" placeholder="Quantity" />
						</div>

						<div className={styles["add-inventory__form-field"]}>
							<label htmlFor="base_price">Suggested Retail Price:</label>
							<input id="base_price" type="text" placeholder="Suggested retail price" />
						</div>

						<div className={styles["add-inventory__form-field"]}>
							<label htmlFor="company_price">Company Price:</label>
							<input id="company_price" type="text" placeholder="Company Price" />
						</div>
					</div>

					<div className={styles["add-inventory__image-container"]}>
						<div className={styles["add-inventory__form-field"]}>
							<label htmlFor="description">Description:</label>
							<textarea id="description" placeholder="Description" rows={4} />
						</div>
					</div>
				</div>

				<div className={styles["add-inventory__cta"]}>
					<button>CLOSE</button>
					<button type="submit">ADD ITEM</button>
				</div>
			</form>
		</>
	);
};

export default AddInventory;
