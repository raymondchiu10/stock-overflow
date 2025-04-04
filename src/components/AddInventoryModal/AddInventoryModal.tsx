import React, { useContext, useState } from "react";
import SOModal from "../SOModal/SOModal";
import { ModalContext } from "../ModalContextProvider/ModalContextProvider";
import axios from "axios";
import { useForm } from "react-hook-form";

interface AddInventoryInputs {
	email: string;
	password: string;
	confirmPassword: string;
}

const AddInventoryModal = () => {
	const { addInventoryModalIsOpen, setAddInventoryModalIsOpen } = useContext(ModalContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddInventoryInputs>();

	const [submitError, setSubmitError] = useState();

	const handleAddInventory = async (formData: AddInventoryInputs) => {
		try {
			const { data } = await axios.post(`/api/sign-up`, {
				email: formData.email,
				password: formData.password,
			});

			if (data.token) {
				localStorage.setItem("authToken", data.token);
				axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setSubmitError(err?.response?.data?.error || "Log in failed");
				console.error(err?.response?.data?.error || "Log in failed");
			}
		}
	};

	return (
		<SOModal isOpen={addInventoryModalIsOpen} setIsOpen={setAddInventoryModalIsOpen}>
			<div>
				<h2>Add Inventory</h2>
				{submitError && JSON.stringify(submitError)}
				<form onSubmit={handleSubmit((data) => handleAddInventory(data))}>
					<div>
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="text"
							placeholder="Email"
							{...register("email", { required: "Email is required." })}
						/>
						{errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
					</div>
					<div>
						<label htmlFor="password">Email</label>
						<input
							id="password"
							type="password"
							placeholder="Password"
							{...register("password", { required: "Password is required." })}
						/>
						{errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
					</div>

					<div>
						<label htmlFor="confirm-password">Email</label>

						<input
							id="confirm-password"
							type="password"
							placeholder="Confirm Password"
							{...register("confirmPassword", {
								required: "Confirm Password is required.",
								validate: (value) => value === password || "Passwords don't match.",
							})}
						/>
						{errors.confirmPassword && (
							<span style={{ color: "red" }}>{errors.confirmPassword.message}</span>
						)}
					</div>
					<button type="submit">Sign Up</button>
				</form>
			</div>
		</SOModal>
	);
};

export default AddInventoryModal;
