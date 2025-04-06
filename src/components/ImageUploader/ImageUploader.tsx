"use client";
import useAuth from "@/lib/useAuth";
import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { Dispatch, SetStateAction } from "react";

interface ImageUploaderProps {
	setImage: Dispatch<SetStateAction<CloudinaryUploadWidgetResults | undefined>>;
}

const ImageUploader = ({ setImage }: ImageUploaderProps) => {
	const { isAuthenticated } = useAuth({ redirect: false });
	const successHelper = (result: CloudinaryUploadWidgetResults) => {
		setImage(result);
	};

	if (!isAuthenticated) {
		return null;
	}

	return (
		<CldUploadWidget
			uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
			signatureEndpoint={`/api/cloudinary/signature`}
			onSuccess={successHelper}
			onQueuesEnd={(result, { widget }) => {
				widget.close();
			}}
		>
			{({ open }) => {
				const handleOnClick = () => {
					setImage(undefined);
					open();
				};
				return <button onClick={handleOnClick}>Upload an Image</button>;
			}}
		</CldUploadWidget>
	);
};

export default ImageUploader;
