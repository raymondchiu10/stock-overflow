import React, { useContext, useEffect } from "react";
import SOModal from "@/components/SOModal/SOModal";
import styles from "./inventory-admin-details-modal.module.scss";
import { ModalContext } from "@/components/ModalContextProvider/ModalContextProvider";
import Image from "next/image";
import { useInventoryImage } from "@/lib/useImages";

const InventoryAdminDetailsModal = () => {
	const { modalIsOpen, setModalIsOpen, selectedInventoryItem } = useContext(ModalContext);
	const { selectedInventoryImages } = useInventoryImage(selectedInventoryItem?.uuid);

	if (!selectedInventoryItem) {
		return null;
	}

	return (
		<SOModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
			<div className={styles["inventory-admin-details-modal"]}>
				<div className={styles["inventory-admin-details-modal__header"]}>
					<h2>Look up Item</h2>
				</div>
				<div>
					<div>
						<div>
							<h3>Product Name:</h3>
							<p>{selectedInventoryItem?.name}</p>
						</div>
						<div>
							<h3>Quantity:</h3>
							<p>{selectedInventoryItem?.quantity}</p>
						</div>
						<div>
							<h3>Retail Price:</h3>
							<p>{selectedInventoryItem?.company_price || selectedInventoryItem?.base_price}</p>
						</div>
					</div>

					<div>
						{selectedInventoryImages.data ? (
							<div>
								<Image
									src={selectedInventoryImages.data?.images[0]?.url}
									alt={selectedInventoryImages.data?.images[0]?.alt || "Product image"}
									width={100}
									height={100}
								/>
							</div>
						) : (
							<div>No image available</div>
						)}
						<div>
							<p>{selectedInventoryItem.description}</p>
						</div>
					</div>
				</div>

				<div className={styles["inventory-admin-details-modal__cta"]}>
					<button
						onClick={() => {
							setModalIsOpen(!modalIsOpen);
						}}
					>
						CLOSE
					</button>
					<button
						onClick={() => {
							setModalIsOpen(!modalIsOpen);
						}}
					>
						OKAY
					</button>
				</div>
			</div>
		</SOModal>
	);
};

export default InventoryAdminDetailsModal;
