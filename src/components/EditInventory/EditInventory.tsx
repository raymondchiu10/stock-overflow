import styles from "./edit-inventory.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../ModalContextProvider/ModalContextProvider";
import { useForm } from "react-hook-form";
import { useEditInventoryMutation } from "@/lib/useInventory";
import { useInventory } from "@/lib/useImages";
import { useQueryClient } from "@tanstack/react-query";

export interface AddInventoryInputs {
	name: string;
	description: string;
	base_price: string;
	quantity: number;
	company_price: number;
	company_uuid?: string;
}

const EditInventory = () => {
	const {
		editInventoryModalIsOpen: modalIsOpen,
		setEditInventoryModalIsOpen: setModalIsOpen,
		selectedInventoryItem,
		setSelectedInventoryItem,
	} = useContext(ModalContext);

	const editInventoryMutation = useEditInventoryMutation();
	const queryClient = useQueryClient();
	const { refetch } = useInventory();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		reset,
	} = useForm<AddInventoryInputs>();

	const [submitError, setSubmitError] = useState();

	useEffect(() => {
		if (selectedInventoryItem) {
			setValue("name", selectedInventoryItem.name);
			setValue("quantity", Number(selectedInventoryItem.quantity));
			setValue("base_price", selectedInventoryItem.base_price);
			setValue("company_price", Number(selectedInventoryItem.company_price));
			setValue("description", selectedInventoryItem.description || "");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedInventoryItem]);

	useEffect(() => {
		setTimeout(() => {
			setSubmitError(undefined);
		}, 4000);
	}, [submitError]);

	const handleAddInventory = async (formData: AddInventoryInputs) => {
		if (!selectedInventoryItem) {
			return;
		}
		try {
			await editInventoryMutation.mutateAsync(
				{
					payload: {
						...formData,
						company_uuid: process.env.NEXT_PUBLIC_COMPANY_UUID || undefined, // TODO: figure out distinct companies next sprint
					},
					inventoryUuid: selectedInventoryItem?.uuid as string,
				},
				{
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ["inventory"], exact: false });
					},
				}
			);

			// TODO: figure out cloudinary widget

			reset();
			setModalIsOpen(!modalIsOpen);
			refetch();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<span style={{ color: "red" }}>{submitError}</span>

			<form className={styles["edit-inventory"]} onSubmit={handleSubmit((data) => handleAddInventory(data))}>
				<div className={styles["edit-inventory__header"]}>
					<h2>Edit Inventory Item</h2>
				</div>

				<div className={styles["edit-inventory__body"]}>
					<div className={styles["edit-inventory__field-container"]}>
						<div className={styles["edit-inventory__form-field"]}>
							<label htmlFor="name">Product Name:</label>
							<input
								id="name"
								type="text"
								placeholder="Product name"
								{...register("name", { required: "Product name is required." })}
							/>
							{errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}
						</div>

						<div className={styles["edit-inventory__form-field"]}>
							<label htmlFor="quantity">Quantity:</label>
							<input
								id="quantity"
								type="text"
								placeholder="Quantity"
								{...register("quantity", { required: "Product quantity is required." })}
							/>
							{errors.quantity && <span style={{ color: "red" }}>{errors.quantity.message}</span>}
						</div>

						<div className={styles["edit-inventory__form-field"]}>
							<label htmlFor="base_price">Suggested Retail Price:</label>
							<input
								id="base_price"
								type="text"
								placeholder="Suggested retail price"
								{...register("base_price", { required: "Product suggested retail price is required." })}
							/>
							{errors.base_price && <span style={{ color: "red" }}>{errors.base_price.message}</span>}
						</div>

						<div className={styles["edit-inventory__form-field"]}>
							<label htmlFor="company_price">Company Price:</label>
							<input
								id="company_price"
								type="text"
								placeholder="Company Price"
								{...register("company_price")}
							/>
						</div>
					</div>

					<div className={styles["edit-inventory__image-container"]}>
						<div className={styles["edit-inventory__image-uploader"]}>
							{/* {image && (
								<CldImage
									// @ts-ignore
									src={image?.info?.public_id}
									alt={`temporary image to be uploaded`}
									width={150}
									height={150}
								/>
							)}
							<ImageUploader setImage={setImage} /> */}
						</div>

						<div className={styles["edit-inventory__form-field"]}>
							<label htmlFor="description">Description:</label>
							<textarea
								id="description"
								placeholder="Description"
								rows={4}
								{...register("description", { required: "Product description is required." })}
							/>
							{errors.description && <span style={{ color: "red" }}>{errors.description.message}</span>}
						</div>
					</div>
				</div>

				<div className={styles["edit-inventory__cta"]}>
					<button
						onClick={() => {
							setModalIsOpen(false);
							setSelectedInventoryItem(null);
						}}
					>
						CLOSE
					</button>

					<button type="submit">UPDATE</button>
				</div>
			</form>
		</>
	);
};

export default EditInventory;
