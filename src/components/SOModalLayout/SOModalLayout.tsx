"use client";
import styles from "./so-modal-layout.module.scss";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

const SOModalLayout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();

	const onClose = useCallback(() => router.back(), [router]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [onClose]);

	return (
		<div className={styles["so-modal-layout"]} onClick={onClose}>
			<div className={styles["so-modal-layout__body"]} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default SOModalLayout;
