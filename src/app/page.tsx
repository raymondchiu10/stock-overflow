"use client";
import Link from "next/link";
import styles from "./home.module.scss";
import useAuth from "@/lib/useAuth";
import SOLogoutButton from "@/components/SOLogoutButton/SOLogoutButton";

export default function Home() {
	const { isAuthenticated } = useAuth({ redirect: false });

	return (
		<main className={styles["home"]}>
			<header className={styles["home__header"]}>
				<h1>Stock Overflow</h1>
				{isAuthenticated ? <SOLogoutButton redirect="/" /> : <Link href="/log-in">Log in</Link>}
			</header>
			<section className={styles["home__body"]}>
				<div className={styles["home__body-container"]}>
					<p>An inventory management wep app.</p>
				</div>
				<Link href={"/dashboard"}>Go to Inventory</Link>
			</section>
		</main>
	);
}
