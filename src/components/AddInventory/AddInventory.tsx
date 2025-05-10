"use client";
import { useRouter } from "next/navigation";
import styles from "./add-inventory.module.scss";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import useAuth from "@/lib/useAuth";
export interface AddInventoryFormData {
	name: string;
	description: string;
	quantity: number;
	base_price: string;
	suggested_price: number;
}

const AddInventory = () => {
	const { token } = useAuth({ redirect: false });

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddInventoryFormData>();
	const router = useRouter();

	const submitInventoryItem = async (data: AddInventoryFormData) => {
		try {
			const response = await fetch("/api/inventory", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token ?? ""}`,
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Failed to add inventory item");
			}

			router.replace("/dashboard");
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	const onClose = useCallback(() => router.back(), [router]);

	return (
		<>
			<form className={styles["add-inventory"]} onSubmit={handleSubmit(submitInventoryItem)}>
				<div className={styles["add-inventory__header"]}>
					<h2>Add Inventory Item</h2>
				</div>

				<div className={styles["add-inventory__body"]}>
					<div className={styles["add-inventory__field-container"]}>
						<div className={styles["add-inventory__form-field"]}>
							<label htmlFor="name">Product Name:</label>
							<input
								id="name"
								type="text"
								placeholder="Product Name"
								{...register("name", { required: "Name is required." })}
							/>
							{errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}
						</div>

						<div className={styles["add-inventory__form-field"]}>
							<label htmlFor="quantity">Quantity:</label>
							<input
								id="quantity"
								type="text"
								placeholder="Quantity"
								{...register("quantity", { required: "Quantity is required." })}
							/>
							{errors.quantity && <span style={{ color: "red" }}>{errors.quantity.message}</span>}
						</div>

						<div className={styles["add-inventory__form-field"]}>
							<label htmlFor="base_price">Base Price:</label>
							<input
								id="base_price"
								type="text"
								placeholder="Base Price"
								{...register("base_price", { required: "Base Price is required." })}
							/>
							{errors.base_price && <span style={{ color: "red" }}>{errors.base_price.message}</span>}
						</div>

						<div className={styles["add-inventory__form-field"]}>
							<label htmlFor="suggested_price">Suggested Price:</label>
							<input
								id="suggested_price"
								type="text"
								placeholder="Suggested Price"
								{...register("suggested_price", { required: "Suggested Price is required." })}
							/>
							{errors.suggested_price && (
								<span style={{ color: "red" }}>{errors.suggested_price.message}</span>
							)}
						</div>
					</div>

					<div className={styles["add-inventory__image-container"]}>
						<div className={styles["add-inventory__form-field"]}>
							<label htmlFor="description">Description:</label>
							<textarea
								id="description"
								placeholder="Description"
								rows={4}
								{...register("description", {
									valueAsNumber: true,
								})}
							/>

							{errors.description && <span style={{ color: "red" }}>{errors.description.message}</span>}
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
