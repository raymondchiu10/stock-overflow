"use client";

import React, { useEffect, useState } from "react";
import styles from "./log-in.module.scss";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/useUser";
import SOHeader from "@/components/SOHeader/SOHeader";

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

	const router = useRouter();
	const { refetch } = useUser();

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
			refetch();
			router.push("/dashboard");
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				setSubmitError(err?.response?.data?.error || "Log in failed");
				console.error(err?.response?.data?.error || "Log in failed");
			}
		}
	};

	return (
		<section className={styles["log-in"]}>
			<SOHeader />

			<div className={styles["log-in__spacing"]}>
				<div className={styles["log-in__container"]}>
					<h2>Log In</h2>
					<form
						className={styles["log-in__form"]}
						onSubmit={handleSubmit((data) => {
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
							{errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
						</div>

						<div className={styles["log-in__form-field-submit"]}>
							<button type="submit">Log in</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Login;
