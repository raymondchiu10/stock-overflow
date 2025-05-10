"use client";
import { useRouter } from "next/navigation";
import styles from "./edit-inventory.module.scss";
import { useCallback } from "react";
import { submitHelper } from "./actions";

interface Props {
	uuid: string;
}

const EditInventory = ({ uuid }: Props) => {
	const router = useRouter();

	const onClose = useCallback(() => router.back(), [router]);

	return (
		<>
			<form className={styles["edit-inventory"]} action={submitHelper}>
				<div className={styles["edit-inventory__header"]}>
					<h2>Edit Inventory Item</h2>
				</div>

				<div className={styles["edit-inventory__body"]}>
					<div className={styles["edit-inventory__field-container"]}>
						<div className={styles["edit-inventory__form-field"]}>
							<label htmlFor="name">Product Name:</label>
							<input name="name" id="name" type="text" placeholder="Product name" />
						</div>

						<div className={styles["edit-inventory__form-field"]}>
							<label htmlFor="quantity">Quantity:</label>
							<input name="quantity" id="quantity" type="text" placeholder="Quantity" />
						</div>

						<div className={styles["edit-inventory__form-field"]}>
							<label htmlFor="base_price">Suggested Retail Price:</label>
							<input name="base_price" id="base_price" type="text" placeholder="Suggested retail price" />
						</div>

						<div className={styles["edit-inventory__form-field"]}>
							<label htmlFor="suggested_price">Company Price:</label>
							<input
								name="suggested_price"
								id="suggested_price"
								type="text"
								placeholder="Company Price"
							/>
						</div>
					</div>

					<div className={styles["edit-inventory__image-container"]}>
						<div className={styles["edit-inventory__form-field"]}>
							<label htmlFor="description">Description:</label>
							<textarea name="description" id="description" placeholder="Description" rows={4} />
						</div>
					</div>
				</div>

				<div className={styles["edit-inventory__cta"]}>
					<button onClick={onClose}>CLOSE</button>
					<button type="submit">ADD ITEM</button>
				</div>
			</form>
		</>
	);
};

export default EditInventory;
