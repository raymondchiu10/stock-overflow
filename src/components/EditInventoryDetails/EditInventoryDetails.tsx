import styles from "./edit-inventory-details.module.scss";
import React, { useContext, useState } from "react";
import { ModalContext } from "../ModalContextProvider/ModalContextProvider";
import { useForm } from "react-hook-form";

interface AddInventoryInputs {
	name: string;
	description: string;
	base_price: string;
	quantity: number;
	company_price: number;
}

const EditInventoryDetails = () => {
	const { addInventoryModalIsOpen: modalIsOpen, setAddInventoryModalIsOpen: setModalIsOpen } =
		useContext(ModalContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddInventoryInputs>();

	const [submitError, setSubmitError] = useState();

	const handleAddInventory = async (formData: AddInventoryInputs) => {
		console.log(formData);
	};

	return (
		<form className={styles["edit-inventory-details"]} onSubmit={handleSubmit((data) => handleAddInventory(data))}>
			<div className={styles["edit-inventory-details__header"]}>
				<h2>Add Inventory Item</h2>
			</div>

			{submitError && JSON.stringify(submitError)}
			<div className={styles["edit-inventory-details__body"]}>
				<div className={styles["edit-inventory-details__field-container"]}>
					<div className={styles["edit-inventory-details__form-field"]}>
						<label htmlFor="name">Product Name:</label>
						<input
							id="name"
							type="text"
							placeholder="Product name"
							{...register("name", { required: "Product name is required." })}
						/>
						{errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}
					</div>

					<div className={styles["edit-inventory-details__form-field"]}>
						<label htmlFor="quantity">Quantity:</label>
						<input
							id="quantity"
							type="text"
							placeholder="Quantity"
							{...register("quantity", { required: "Product quantity is required." })}
						/>
						{errors.quantity && <span style={{ color: "red" }}>{errors.quantity.message}</span>}
					</div>

					<div className={styles["edit-inventory-details__form-field"]}>
						<label htmlFor="base_price">Suggested Retail Price:</label>
						<input
							id="base_price"
							type="text"
							placeholder="Suggested retail price"
							{...register("base_price", { required: "Product suggested retail price is required." })}
						/>
						{errors.base_price && <span style={{ color: "red" }}>{errors.base_price.message}</span>}
					</div>
				</div>

				<div>
					<div className={styles["edit-inventory-details__form-field"]}>
						<label htmlFor="description">Description:</label>
						<input
							id="description"
							type="text"
							placeholder="Description"
							{...register("description", { required: "Product description is required." })}
						/>
						{errors.description && <span style={{ color: "red" }}>{errors.description.message}</span>}
					</div>
				</div>
			</div>

			<div className={styles["edit-inventory-details__cta"]}>
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
	);
};

export default EditInventoryDetails;
