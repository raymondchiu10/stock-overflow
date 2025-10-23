"use client";
import React from "react";
import dynamic from "next/dynamic";
import styles from "./qr-code.module.scss";
import SOModalLayout from "@/components/SOModalLayout/SOModalLayout";
import { useRouter } from "next/navigation";
import type { Html5QrcodeResult } from "html5-qrcode";

const QrCodeScanner = dynamic(() => import("@/lib/QrCodeScanner"), {
	ssr: false,
});

const QRCode = () => {
	const router = useRouter();

	const handleScanSuccess = async (decodedText: string, decodedResult: Html5QrcodeResult) => {
		console.log(`Code scanned: ${decodedText}`, decodedResult);
		router.replace(`${decodedText}`);
	};

	return (
		<SOModalLayout>
			<div className={styles["qr-code-modal"]}>
				<div className={styles["qr-code-modal__header"]}>
					<h2>Look up Item</h2>
				</div>

				<div>
					<QrCodeScanner onScanSuccess={handleScanSuccess} />
				</div>

				<div className={styles["qr-code-modal__cta"]}>
					<button onClick={() => router.back()}>CLOSE</button>
					<button onClick={() => router.back()}>OKAY</button>
				</div>
			</div>
		</SOModalLayout>
	);
};

export default QRCode;
