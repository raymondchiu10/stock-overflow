"use client";
import React, { useEffect, useRef, useCallback } from "react";
import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";

type QrCodeScannerProps = {
	onScanSuccess: (decodedText: string, decodedResult: Html5QrcodeResult) => void;
	fps?: number;
	qrbox?: number;
};

const QrCodeScanner: React.FC<QrCodeScannerProps> = ({ onScanSuccess, fps = 10, qrbox = 250 }) => {
	const scannerContainerRef = useRef<HTMLDivElement | null>(null);
	const scannerRef = useRef<Html5QrcodeScanner | null>(null);
	const containerIdRef = useRef(`qr-scanner-${Math.random().toString(36).substr(2, 9)}`);

	const successCallback = useCallback(
		(decodedText: string, decodedResult: Html5QrcodeResult) => {
			onScanSuccess(decodedText, decodedResult);
		},
		[onScanSuccess]
	);

	const errorCallback = useCallback((err: string) => {
		console.warn("QR Scan error:", err);
	}, []);

	useEffect(() => {
		if (!scannerContainerRef.current || typeof window === "undefined") return;

		const containerId = `${containerIdRef}`;
		scannerContainerRef.current.id = containerId;

		const scanner = new Html5QrcodeScanner(containerId, { fps, qrbox }, false);
		scannerRef.current = scanner;

		scanner.render(successCallback, errorCallback);

		return () => {
			scannerRef.current?.clear().catch((err) => console.error("Error clearing scanner:", err));
			scannerRef.current = null;
		};
	}, [fps, qrbox, successCallback, errorCallback]);

	return <div ref={scannerContainerRef} style={{ width: "100%" }} />;
};

export default QrCodeScanner;
