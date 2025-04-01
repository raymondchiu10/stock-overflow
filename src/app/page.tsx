import styles from "./page.module.scss";

export default function Home() {
	return (
		<div className={styles.page}>
			<main>
				<h1>Stock Overflow</h1>
				<p>An inventory management wep app.</p>
			</main>
		</div>
	);
}
