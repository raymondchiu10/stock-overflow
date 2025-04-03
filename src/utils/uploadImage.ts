import { axiosAuth } from "@/lib/axiosAuth";

export const uploadImage = async (base64Image: string) => {
	const authToken = localStorage.getItem("authToken");

	try {
		const response = await axiosAuth(authToken || "").post(`/api/upload`, {
			body: JSON.stringify({ data: base64Image }),
		});

		const result = await response.json();
		return result;
	} catch (error) {
		console.error("Upload failed:", error);
		return { error: "Upload failed" };
	}
};
