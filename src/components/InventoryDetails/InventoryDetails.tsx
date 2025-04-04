import styles from "./inventory-details.module.scss";
import { useInventoryImage } from "@/lib/useImages";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../ModalContextProvider/ModalContextProvider";

const InventoryDetails = () => {
	const { modalIsOpen, setModalIsOpen, selectedInventoryItem } = useContext(ModalContext);
	const { data: selectedInventoryImages } = useInventoryImage(selectedInventoryItem?.uuid as string);
	const [image, setImage] = useState<string>();

	useEffect(() => {
		if (selectedInventoryImages) {
			setImage(selectedInventoryImages?.images[0]?.url);
		}
	}, [selectedInventoryImages]);

	return (
		<div className={styles["inventory-details"]}>
			<div className={styles["inventory-details__header"]}>
				<h2>Look up Item</h2>
			</div>

			<div className={styles["inventory-details__body"]}>
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
					{image ? (
						<div>
							<Image
								src={image}
								alt={selectedInventoryImages?.images[0]?.alt || "Product image"}
								width={100}
								height={100}
							/>
						</div>
					) : (
						<div>No image available</div>
					)}
					<div>
						<p>{selectedInventoryItem?.description}</p>
					</div>
				</div>
			</div>

			<div className={styles["inventory-details__cta"]}>
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
	);
};

export default InventoryDetails;
