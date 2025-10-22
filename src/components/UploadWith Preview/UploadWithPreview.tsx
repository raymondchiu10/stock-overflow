"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./upload-with-preview.module.scss";

interface IProps {
	label?: string;
	onFileSelect?: (file: File | null) => void; // pass file back up
}

export const UploadWithPreview = ({ label, onFileSelect }: IProps) => {
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	useEffect(() => {
		if (onFileSelect) onFileSelect(file);
	}, [file, onFileSelect]);

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
			setPreviewUrl(URL.createObjectURL(selectedFile));
		}
	}

	function clearSelection() {
		setFile(null);
		setPreviewUrl(null);
	}

	return (
		<div className={styles["upload-with-preview"]}>
			{label && <label>{label}:</label>}
			<input type="file" accept="image/*" onChange={handleFileChange} />

			{previewUrl && (
				<div>
					<Image
						src={previewUrl}
						alt="Preview"
						width={200}
						height={200}
						className={styles["upload-with-preview__image"]}
					/>
					<div className="flex gap-2 mt-2">
						<button type="button" onClick={clearSelection} className="px-3 py-1 bg-gray-300 rounded">
							Remove
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
