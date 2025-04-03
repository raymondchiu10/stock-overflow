import React, { useState, useContext } from "react";
import dynamic from "next/dynamic";
import SOModal from "@/components/SOModal/SOModal";
import styles from "./qr-code-modal.module.scss";
import { ModalContext } from "@/components/ModalContextProvider/ModalContextProvider";

const QrCodeScanner = dynamic(() => import("@/lib/QrCodeScanner"), {
	ssr: false,
});
const QRCodeModal = () => {
	const { qrCodeModalIsOpen, setQrCodeModalIsOpen } = useContext(ModalContext);
	const [scanResult, setScanResult] = useState<string>("");
	const [error, setError] = useState<string>("");

	const handleScanSuccess = (decodedText: string, decodedResult: any) => {
		console.log(`Code scanned: ${decodedText}`, decodedResult);
		setScanResult(decodedText);
		// You can handle the scanned result here (e.g., navigate to the URL, display data)
	};

	const handleScanFailure = (error: string) => {
		// Only set error for important failures
		if (error.includes("permission") || error.includes("access")) {
			setError(error);
		}
	};

	return (
		<SOModal isOpen={qrCodeModalIsOpen} setIsOpen={setQrCodeModalIsOpen}>
			<div className={styles["qr-code-modal"]}>
				<div className={styles["qr-code-modal__header"]}>
					<h2>Look up Item</h2>
				</div>
				<div>
					{typeof window !== "undefined" && (
						<QrCodeScanner
							fps={10}
							qrbox={250}
							disableFlip={false}
							onScanSuccess={handleScanSuccess}
							onScanFailure={handleScanFailure}
						/>
					)}
					{error && <div>Error: {error}</div>}

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
