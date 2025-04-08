"use client";
import styles from "./home.module.scss";
import SOHeader from "@/components/SOHeader/SOHeader";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	return (
		<main className={styles["home"]}>
			<SOHeader />

			<section className={styles["home__body"]}>
				<div className={styles["home__body-container"]}>
					<h2>An inventory management wep app.</h2>
					<button onClick={() => router.push("/dashboard")}>Go to Inventory</button>
				</div>
			</section>
		</main>
	);
}
