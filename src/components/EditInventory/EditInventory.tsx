"use client";

import { useRouter } from "next/navigation";
import styles from "./edit-inventory.module.scss";
import { useCallback, useEffect, useState } from "react";
import { AddInventoryFormData } from "./actions";
import { useInventoryItem } from "@/lib/useInventory";
import { useForm } from "react-hook-form";
import useAuth from "@/lib/useAuth";

interface Props {
	uuid: string;
}

const EditInventory = ({ uuid }: Props) => {
	const { data, isLoading } = useInventoryItem(uuid);
	const { token, loading } = useAuth({});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<AddInventoryFormData>();

	const [submitError, setSubmitError] = useState<string | undefined>();

	const router = useRouter();

	useEffect(() => {
		if (data) {
			reset(data[0]);
		}
	}, [data, reset]);

	useEffect(() => {
		setTimeout(() => {
			setSubmitError(undefined);
		}, 4000);
	}, [submitError]);

	const handleEditInventoryItem = async (data: AddInventoryFormData) => {
		try {
			const res = await fetch(`/api/inventory/${uuid}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			});

			const resData = await res.json();

			if (!res.ok) throw new Error(resData.error || "Inventory Edit failed");

			router.push("/dashboard");
		} catch (err) {
			setSubmitError(err instanceof Error ? err.message : "Inventory Edit failed");
			console.error(err);
		}
	};

	const onClose = useCallback(() => router.back(), [router]);

	if (isLoading || loading) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<form className={styles["edit-inventory"]} onSubmit={handleSubmit(handleEditInventoryItem)}>
				<div className={styles["edit-inventory__header"]}>
					<h2>Edit Inventory Item: {data[0]?.name}</h2>
				</div>

				<span style={{ color: "red" }}>{submitError}</span>

				<div className={styles["edit-inventory__body"]}>
					<div className={styles["edit-inventory__field-container"]}>
						<div className={styles["edit-inventory__form-field"]}>
							<label htmlFor="name">Product Name:</label>
							<input
								id="name"
								type="text"
								placeholder="Product name"
								{...register("name", { required: "Name is required." })}
							/>
							{errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}
						</div>

						<div className={styles["edit-inventory__form-field"]}>
							<label htmlFor="quantity">Quantity:</label>
							<input
								id="quantity"
								type="text"
								placeholder="Quantity"
								{...register("quantity", { required: "Quantity is required." })}
							/>
							{errors.quantity && <span style={{ color: "red" }}>{errors.quantity.message}</span>}
						</div>

						<div className={styles["edit-inventory__form-field"]}>
							<label htmlFor="base_price">Base Price:</label>
							<input
								id="base_price"
								type="text"
								placeholder="Base price"
								{...register("base_price", { required: "Base Price is required." })}
							/>
							{errors.base_price && <span style={{ color: "red" }}>{errors.base_price.message}</span>}
						</div>

						<div className={styles["edit-inventory__form-field"]}>
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

					<div className={styles["edit-inventory__image-container"]}>
						<div className={styles["edit-inventory__form-field"]}>
							<label htmlFor="description">Description:</label>
							<textarea
								id="description"
								placeholder="Description"
								rows={4}
								{...register("description", {
									required: false,
								})}
							/>
							{errors.description && <span style={{ color: "red" }}>{errors.description.message}</span>}
						</div>
					</div>
				</div>

				<div className={styles["edit-inventory__cta"]}>
					<button type="button" onClick={onClose}>
						CLOSE
					</button>
					<button type="submit">UPDATE ITEM</button>
				</div>
			</form>
		</>
	);
};

export default EditInventory;
