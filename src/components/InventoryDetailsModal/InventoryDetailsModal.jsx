import React from "react";
import SOModal from "@/components/SOModal/SOModal";
import styles from "./inventory-details-modal.module.scss";

const InventoryDetailsModal = ({ isOpen, setIsOpen }) => {
	return (
		<SOModal isOpen={isOpen} setIsOpen={setIsOpen}>
			<div className={styles["inventory-details-modal"]}>
				<div className={styles["inventory-details-modal__header"]}>
					<h2>Test Modal</h2>
					<p>This is some Dummy data</p>
				</div>

				<div className={styles["inventory-details-modal__cta"]}>
					<button
						onClick={() => {
							setIsOpen(!isOpen);
						}}
					>
						CLOSE
					</button>
					<button onClick={() => alert("hello")}>TEST</button>
				</div>
			</div>
		</SOModal>
	);
};

export default InventoryDetailsModal;
