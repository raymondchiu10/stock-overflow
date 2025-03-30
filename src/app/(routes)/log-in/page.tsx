"use client";

import React, { useEffect, useState } from "react";
import styles from "./log-in.module.scss";

import axios from "axios";
import SOLogoutButton from "@/components/SOLogoutButton/SOLogoutButton";
import { useForm } from "react-hook-form";

interface LoginFormInputs {
	email: string;
	password: string;
}

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>();
	const [submitError, setSubmitError] = useState();

	useEffect(() => {
		setTimeout(() => {
			setSubmitError(undefined);
		}, 4000);
	}, [submitError]);

	const handleLogin = async (data: LoginFormInputs) => {
		try {
			const res = await axios.post(`/api/log-in`, data);

			localStorage.setItem("authToken", res.data.token);
			axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				setSubmitError(err?.response?.data?.error || "Log in failed");
				console.error(err?.response?.data?.error || "Log in failed");
			}
		}
	};

	return (
		<div className={styles["log-in"]}>
			<h2>Log In</h2>
			<form
				className={styles["log-in__form"]}
				onSubmit={handleSubmit((data) => {
					console.log(data);
					handleLogin(data);
				})}
			>
				<span style={{ color: "red" }}>{submitError}</span>
				<div className={styles["log-in__form-field"]}>
					<label htmlFor="email">Email</label>
					<input
						type="text"
						placeholder="Email"
						id="email"
						{...register("email", { required: "Email is required." })}
					/>
					{errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
				</div>

				<div className={styles["log-in__form-field"]}>
					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						placeholder="Password"
						{...register("password", { required: "Password is required." })}
					/>
					{errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
				</div>

				<button type="submit">Log in</button>
			</form>

			<SOLogoutButton />
		</div>
	);
};

export default Login;
