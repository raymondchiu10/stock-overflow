"use client";
import Link from "next/link";
import styles from "./home.module.scss";
import SOHeader from "@/components/SOHeader/SOHeader";

export default function Home() {
	return (
		<main className={styles["home"]}>
			<SOHeader />

			<section className={styles["home__body"]}>
				<div className={styles["home__body-container"]}>
					<p>An inventory management wep app.</p>
				</div>
				<Link href={"/dashboard"}>Go to Inventory</Link>
			</section>
		</main>
	);
}
