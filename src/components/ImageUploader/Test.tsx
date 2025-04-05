"use client";
import { CldUploadWidget } from "next-cloudinary";

const ImageUploader = () => {
	return (
		<CldUploadWidget
			uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
			signatureEndpoint={`/api/cloudinary/signature`}
			onUploadAdded={(file) => console.log("Upload started:", file)}
			onSuccess={(result) => console.log("Upload success:", result)}
		>
			{({ open }) => {
				return <button onClick={() => open()}>Upload an Image</button>;
			}}
		</CldUploadWidget>
	);
};

export default ImageUploader;
