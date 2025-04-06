import styles from "./inventory-details.module.scss";
import { useInventoryImage } from "@/lib/useImages";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../ModalContextProvider/ModalContextProvider";
import { useQrCode } from "@/lib/useQrCode";

const InventoryDetails = () => {
	const { modalIsOpen, setModalIsOpen, selectedInventoryItem, setSelectedInventoryItem } = useContext(ModalContext);
	const { data: selectedInventoryImages, refetch: refetchImages } = useInventoryImage(
		selectedInventoryItem?.uuid as string
	);
	const { data: qrcode, refetch } = useQrCode(selectedInventoryItem?.uuid as string);
	const [image, setImage] = useState<string>();
	const [qrCodeImage, setQrCodeImage] = useState<string>();

	useEffect(() => {
		if (selectedInventoryImages) {
			setImage(selectedInventoryImages?.images[0]?.url);
		}
		return () => {
			setImage(undefined);
		};
	}, [selectedInventoryImages]);

	useEffect(() => {
		if (qrcode) {
			setQrCodeImage(qrcode);
		}
		return () => {
			setQrCodeImage(undefined);
		};
	}, [qrcode]);

	useEffect(() => {
		refetch();
		refetchImages();

		if (!modalIsOpen) {
			setSelectedInventoryItem(null);
		}
	}, [modalIsOpen, refetch, refetchImages, setSelectedInventoryItem]);

	return (
		<div className={styles["inventory-details"]}>
			<div className={styles["inventory-details__header"]}>
				<h2>Look up Item: {selectedInventoryItem?.name}</h2>
			</div>

			<div className={styles["inventory-details__body"]}>
				<div className={styles["inventory-details__body-details"]}>
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

				<div className={styles["inventory-details__body-image"]}>
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

			<div className={styles["inventory-details__body-qr-code-container"]}>
				{qrcode && qrCodeImage && (
					<div className={styles["inventory-details__body-qr-code"]}>
						{/*  eslint-disable-next-line @next/next/no-img-element */}
						<img src={qrCodeImage as string} alt={`${selectedInventoryItem?.name || ""} qr code`} />
					</div>
				)}
			</div>

			<div className={styles["inventory-details__cta"]}>
				<button
					onClick={() => {
						setModalIsOpen(!modalIsOpen);
					}}
				>
					CLOSE
				</button>
			</div>
		</div>
	);
};

export default InventoryDetails;
