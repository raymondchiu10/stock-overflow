const shortenerApiUrl = process.env.SHORTENER_API_URL;
const shortenerApiKey = process.env.SHORTENER_API_KEY;

if (!shortenerApiUrl) {
	throw new Error("SHORTENER_API_URL is not defined");
}

if (!shortenerApiKey) {
	throw new Error("SHORTENER_API_KEY is not defined");
}

export async function createShortLink(originalUrl: string) {
	const response = await fetch(`${shortenerApiUrl}/api/links`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${shortenerApiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			originalUrl,
		}),
	});

	if (!response.ok) {
		const error = await response.text();

		throw new Error(`URL shortener request failed (${response.status}): ${error}`);
	}

	return response.json();
}
