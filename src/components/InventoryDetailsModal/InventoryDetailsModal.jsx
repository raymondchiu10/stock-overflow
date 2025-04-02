import React, { useContext } from "react";
import SOModal from "@/components/SOModal/SOModal";
import styles from "./inventory-details-modal.module.scss";
import { ModalContext } from "@/components/ModalContextProvider/ModalContextProvider";
import Image from "next/image";

const InventoryDetailsModal = () => {
	const { modalIsOpen, setModalIsOpen, selectedInventoryItem, setSelectedInventoryItem } = useContext(ModalContext);

	console.log(selectedInventoryItem);
	return (
		<SOModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
			<div className={styles["inventory-details-modal"]}>
				<div className={styles["inventory-details-modal__header"]}>
					<h2>Look up Item</h2>
				</div>

				<div>
					<div>
						<div>
							<h3>Product Name:</h3>
							<p>{selectedInventoryItem.name}</p>
						</div>
						<div>
							<h3>Quantity:</h3>
							<p>{selectedInventoryItem.quantity}</p>
						</div>
						<div>
							<h3>Retail Price:</h3>
							<p>{selectedInventoryItem.company_price || selectedInventoryItem.base_price}</p>
						</div>
					</div>

					<div>
						<div>
							<Image
								src={selectedInventoryItem.image_url}
								alt={selectedInventoryItem.image_alt}
								width={100}
								height={100}
							/>
						</div>
					</div>
				</div>

				<div className={styles["inventory-details-modal__cta"]}>
					<button
						onClick={() => {
							setModalIsOpen(!modalIsOpen);
							setSelectedInventoryItem({});
						}}
					>
						CLOSE
					</button>
					<button onClick={() => alert("hello")}>OKAY</button>
				</div>
			</div>
		</SOModal>
	);
};

export default InventoryDetailsModal;
