import styles from "./home.module.scss";

const Home = () => {
	return (
		<main className={styles["home"]}>
			<section className={styles["home__container"]}>
				<div>
					<button>ADMIN</button>
				</div>
				<div className={styles["home__container--test"]}>
					<h1>Test</h1>
					<button>Hello</button>
				</div>
			</section>
		</main>
	);
};

export default Home;
