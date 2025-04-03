"use client";
import React, { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

type QrCodeScannerProps = {
	onScanSuccess: (decodedText: string, decodedResult: unknown) => void;
};

const QrCodeScanner: React.FC<QrCodeScannerProps> = ({ onScanSuccess }) => {
	const scannerRef = useRef<Html5QrcodeScanner | null>(null);

	useEffect(() => {
		// Only execute this in the browser
		if (typeof window !== "undefined") {
			try {
				// Create new scanner
				scannerRef.current = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, /* verbose= */ false);

				// Define callbacks
				const successCallback = (decodedText: string, decodedResult: unknown) => {
					onScanSuccess(decodedText, decodedResult);
					if (scannerRef.current) {
						scannerRef.current.clear();
					}
				};

				const errorCallback = (err: string) => {
					console.warn(err);
				};

				// Render the scanner
				scannerRef.current.render(successCallback, errorCallback);

				console.log("Scanner mounted successfully");
			} catch (err) {
				console.error("Error initializing scanner:", err);
			}
		}

		// Cleanup function
		return () => {
			if (scannerRef.current) {
				try {
					scannerRef.current.clear();
					console.log("Scanner unmounted successfully");
				} catch (err) {
					console.error("Error clearing scanner:", err);
				}
			}
		};
	}, [onScanSuccess]);

	return <div id="reader" style={{ width: "100%" }}></div>;
};

export default QrCodeScanner;
