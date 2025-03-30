"use client";
import useAuth from "@/lib/useAuth";
import axios from "axios";
import React, { useEffect } from "react";

const Dashboard = () => {
	const {} = useAuth();
	useEffect(() => {
		const test = async () => {
			try {
				const res = await axios.get("/users/profile");
				console.log(res);
			} catch (err) {
				console.error(err);
			}
		};
		test();
	}, []);
	return <div>Dashboard</div>;
};

export default Dashboard;
