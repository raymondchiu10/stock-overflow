import axios from "axios";

export const axiosAuth = (token: string) => {
	return axios.create({
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
