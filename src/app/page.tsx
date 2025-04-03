import Link from "next/link";
import styles from "./home.module.scss";

export default function Home() {
	return (
		<main>
			<section className={styles["home"]}>
				<div className={styles["home__container"]}>
					<h1>Stock Overflow</h1>
					<p>An inventory management wep app.</p>
				</div>
				<Link href={"/dashboard"}>Go to Inventory</Link>
			</section>
		</main>
	);
}
