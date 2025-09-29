"use client";
import { useRouter } from "next/navigation";
import styles from "./add-inventory.module.scss";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "@/lib/useAuth";
import { AddInventoryFormData } from "@/lib/types/inventory";

import { UploadWithPreview } from "../UploadWith Preview/UploadWithPreview";

const AddInventory = () => {
	const { token } = useAuth({ redirect: false });
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddInventoryFormData>();

	const router = useRouter();

	const fileToBase64 = (file: File) =>
		new Promise<string>((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (err) => reject(err);
		});

	const submitInventoryItem = async (data: AddInventoryFormData) => {
		console.log("data", data);
		try {
			let imageBase64: string | undefined;

			if (selectedFile) {
				imageBase64 = await fileToBase64(selectedFile);
			}

			const response = await fetch("/api/inventory", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token ?? ""}`,
				},
				body: JSON.stringify({ ...data, imageBase64 }),
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
						<div>
							<UploadWithPreview label="Image" onFileSelect={(file) => setSelectedFile(file)} />
						</div>

						<div className={styles["add-inventory__form-field"]}>
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

				<div className={styles["add-inventory__cta"]}>
					<button type="button" onClick={onClose}>
						CLOSE
					</button>
					<button type="submit">ADD ITEM</button>
				</div>
			</form>
		</>
	);
};

export default AddInventory;
