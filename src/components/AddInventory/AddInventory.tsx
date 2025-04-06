/* eslint-disable @typescript-eslint/ban-ts-comment */
import styles from "./add-inventory.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../ModalContextProvider/ModalContextProvider";
import { useForm } from "react-hook-form";
import ImageUploader from "../ImageUploader/ImageUploader";
import { CldImage, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useAddInventoryMutation } from "@/lib/useInventory";
import { useAddInventoryImageMutation, useInventory } from "@/lib/useImages";

export interface AddInventoryInputs {
	name: string;
	description: string;
	base_price: string;
	quantity: number;
	company_price: number;
	company_uuid?: string;
}

const AddInventory = () => {
	const { addInventoryModalIsOpen: modalIsOpen, setAddInventoryModalIsOpen: setModalIsOpen } =
		useContext(ModalContext);

	const [image, setImage] = useState<CloudinaryUploadWidgetResults>();

	const addInventoryMutation = useAddInventoryMutation();
	const addInventoryImageMutation = useAddInventoryImageMutation();
	const { refetch } = useInventory();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<AddInventoryInputs>();

	const [submitError, setSubmitError] = useState();

	useEffect(() => {
		setTimeout(() => {
			setSubmitError(undefined);
		}, 4000);
	}, [submitError]);

	const handleAddInventory = async (formData: AddInventoryInputs) => {
		try {
			const { data } = await addInventoryMutation.mutateAsync({
				...formData,
				company_uuid: process.env.NEXT_PUBLIC_COMPANY_UUID, // TODO: figure out distinct companies next sprint
			});

			const inventoryUuid = data.uuid;

			if (image && inventoryUuid) {
				addInventoryImageMutation.mutateAsync(
					{
						inventoryUuid,
						payload: {
							// @ts-ignore
							url: image?.info?.secure_url,
							name: data.name,
							alt: data.description,
							cloudinary: JSON.stringify(image?.info),
						},
					},
					{
						onSuccess: () => {
							setImage(undefined);
							setModalIsOpen(!modalIsOpen);
						},
					}
				);
			}
			reset();
			setImage(undefined);
			setModalIsOpen(!modalIsOpen);
			refetch();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<span style={{ color: "red" }}>{submitError}</span>

			<form className={styles["add-inventory"]} onSubmit={handleSubmit((data) => handleAddInventory(data))}>
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
								placeholder="Product name"
								{...register("name", { required: "Product name is required." })}
							/>
							{errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}
						</div>

						<div className={styles["add-inventory__form-field"]}>
							<label htmlFor="quantity">Quantity:</label>
							<input
								id="quantity"
								type="text"
								placeholder="Quantity"
								{...register("quantity", { required: "Product quantity is required." })}
							/>
							{errors.quantity && <span style={{ color: "red" }}>{errors.quantity.message}</span>}
						</div>

						<div className={styles["add-inventory__form-field"]}>
							<label htmlFor="base_price">Suggested Retail Price:</label>
							<input
								id="base_price"
								type="text"
								placeholder="Suggested retail price"
								{...register("base_price", { required: "Product suggested retail price is required." })}
							/>
							{errors.base_price && <span style={{ color: "red" }}>{errors.base_price.message}</span>}
						</div>

						<div className={styles["add-inventory__form-field"]}>
							<label htmlFor="company_price">Company Price:</label>
							<input
								id="company_price"
								type="text"
								placeholder="Company Price"
								{...register("company_price")}
							/>
						</div>
					</div>

					<div className={styles["add-inventory__image-container"]}>
						<div className={styles["add-inventory__image-uploader"]}>
							{image && (
								<CldImage
									// @ts-ignore
									src={image?.info?.public_id}
									alt={`temporary image to be uploaded`}
									width={150}
									height={150}
								/>
							)}
							<ImageUploader setImage={setImage} />
						</div>

						<div className={styles["add-inventory__form-field"]}>
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

				<div className={styles["add-inventory__cta"]}>
					<button
						onClick={() => {
							setModalIsOpen(!modalIsOpen);
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

export default AddInventory;
