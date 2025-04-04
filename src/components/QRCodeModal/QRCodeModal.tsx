import React, { useState, useContext } from "react";
import dynamic from "next/dynamic";
import SOModal from "@/components/SOModal/SOModal";
import styles from "./qr-code-modal.module.scss";
import { ModalContext } from "@/components/ModalContextProvider/ModalContextProvider";
import { useInventoryItem } from "@/lib/useInventory";

const QrCodeScanner = dynamic(() => import("@/lib/QrCodeScanner"), {
	ssr: false,
});
const QRCodeModal = () => {
	const { modalIsOpen, setModalIsOpen, setSelectedInventoryItem, qrCodeModalIsOpen, setQrCodeModalIsOpen } =
		useContext(ModalContext);
	const [scanResult, setScanResult] = useState<string>("");
	const { data } = useInventoryItem(scanResult);

	const handleScanSuccess = async (decodedText: string, decodedResult: unknown) => {
		console.log(`Code scanned: ${decodedText}`, decodedResult);

		setScanResult(decodedText);
		setQrCodeModalIsOpen(!qrCodeModalIsOpen);
		setSelectedInventoryItem(data[0]);
		setModalIsOpen(!modalIsOpen);
	};

	return (
		<SOModal isOpen={qrCodeModalIsOpen} setIsOpen={setQrCodeModalIsOpen}>
			<div className={styles["qr-code-modal"]}>
				<div className={styles["qr-code-modal__header"]}>
					<h2>Look up Item</h2>
				</div>
				<div>
					{qrCodeModalIsOpen && typeof window !== "undefined" && (
						<QrCodeScanner onScanSuccess={handleScanSuccess} />
					)}

					{scanResult && (
						<div>
							<h2>Scan Result:</h2>
							<div>{scanResult}</div>
						</div>
					)}
				</div>

				<div className={styles["qr-code-modal__cta"]}>
					<button
						onClick={() => {
							setQrCodeModalIsOpen(!qrCodeModalIsOpen);
						}}
					>
						CLOSE
					</button>
					<button
						onClick={() => {
							setQrCodeModalIsOpen(!qrCodeModalIsOpen);
						}}
					>
						OKAY
					</button>
				</div>
			</div>
		</SOModal>
	);
};

export default QRCodeModal;
