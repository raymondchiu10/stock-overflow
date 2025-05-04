"use server";
export interface AddInventoryFormData {
	name: string;
	description: string;
	base_price: string;
	quantity: number;
	company_price: number;
	company_uuid?: string;
}

export async function submitHelper(formData: FormData) {
	const { name, description, base_price, quantity, company_price, company_uuid } = Object.fromEntries(
		formData
	) as unknown as AddInventoryFormData;

	console.log({
		name: name,
		description: description,
		base_price: base_price,
		company_price: company_price,
		quantity: quantity,
	});
}
