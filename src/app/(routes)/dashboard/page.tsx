"use client";
import useAuth from "@/lib/useAuth";
import React, { useEffect } from "react";

const Dashboard = () => {
	const {} = useAuth();
	useEffect(() => {
		const test = async () => {
			try {
			} catch (err) {
				console.error(err);
			}
		};
		test();
	}, []);
	return <div>Dashboard</div>;
};

export default Dashboard;
