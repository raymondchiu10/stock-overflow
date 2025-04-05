"use client";
import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { Dispatch, SetStateAction } from "react";

interface ImageUploaderProps {
	setImage: Dispatch<SetStateAction<CloudinaryUploadWidgetResults | undefined>>;
}

const ImageUploader = ({ setImage }: ImageUploaderProps) => {
	const successHelper = (result: CloudinaryUploadWidgetResults) => {
		setImage(result);
	};

	return (
		<CldUploadWidget
			uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
			signatureEndpoint={`/api/cloudinary/signature`}
			onUploadAdded={(file) => console.log("Upload started:", file)}
			onSuccess={successHelper}
		>
			{({ open }) => {
				return <button onClick={() => open()}>Upload an Image</button>;
			}}
		</CldUploadWidget>
	);
};

export default ImageUploader;
