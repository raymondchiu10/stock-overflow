"use client";
import { useRouter } from "next/navigation";
import { submitHelper } from "./actions";
import styles from "./add-inventory.module.scss";
import { useCallback } from "react";

const AddInventory = () => {
	const router = useRouter();

	const onClose = useCallback(() => router.back(), [router]);

	return (
		<>
			<form className={styles["add-inventory"]} action={submitHelper}>
				<div className={styles["add-inventory__header"]}>
					<h2>Add Inventory Item</h2>
				</div>

				<div className={styles["add-inventory__body"]}>
					<div className={styles["add-inventory__field-container"]}>
						<div className={styles["add-inventory__form-field"]}>
							<label htmlFor="name">Product Name:</label>
							<input name="name" id="name" type="text" placeholder="Product name" />
						</div>

						<div className={styles["add-inventory__form-field"]}>
							<label htmlFor="quantity">Quantity:</label>
							<input name="quantity" id="quantity" type="text" placeholder="Quantity" />
						</div>

						<div className={styles["add-inventory__form-field"]}>
							<label htmlFor="base_price">Suggested Retail Price:</label>
							<input name="base_price" id="base_price" type="text" placeholder="Suggested retail price" />
						</div>

						<div className={styles["add-inventory__form-field"]}>
							<label htmlFor="company_price">Company Price:</label>
							<input name="company_price" id="company_price" type="text" placeholder="Company Price" />
						</div>
					</div>

					<div className={styles["add-inventory__image-container"]}>
						<div className={styles["add-inventory__form-field"]}>
							<label htmlFor="description">Description:</label>
							<textarea name="description" id="description" placeholder="Description" rows={4} />
						</div>
					</div>
				</div>

				<div className={styles["add-inventory__cta"]}>
					<button onClick={onClose}>CLOSE</button>
					<button type="submit">ADD ITEM</button>
				</div>
			</form>
		</>
	);
};

export default AddInventory;
