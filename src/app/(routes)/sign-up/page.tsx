"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import SOLogoutButton from "@/components/SOLogoutButton/SOLogoutButton";
import { useForm } from "react-hook-form";

interface SignupFormInputs {
	email: string;
	password: string;
	confirmPassword: string;
}

const SignUp = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SignupFormInputs>();
	const [submitError, setSubmitError] = useState();

	useEffect(() => {
		setTimeout(() => {
			setSubmitError(undefined);
		}, 4000);
	}, [submitError]);

	const password = watch("password");

	const handleSignUp = async (formData: SignupFormInputs) => {
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
		<div>
			<h2>SignUp</h2>
			<span style={{ color: "red" }}>{submitError}</span>
			<form onSubmit={handleSubmit((data) => handleSignUp(data))}>
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
					{errors.confirmPassword && <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>}
				</div>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
};

export default SignUp;
