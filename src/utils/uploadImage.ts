import { axiosAuth } from "@/lib/axiosAuth";

export const uploadImage = async (base64Image: string) => {
	const authToken = localStorage.getItem("authToken");

	try {
		const response = await axiosAuth(authToken || "").post(`/api/upload`, {
			data: base64Image,
		});

		return response.data;
	} catch (error) {
		console.error("Upload failed:", error);
		return { error: "Upload failed" };
	}
};
