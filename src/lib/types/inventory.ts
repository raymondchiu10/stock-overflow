export interface AddInventoryFormData {
	name: string;
	description: string;
	base_price: string;
	quantity: number;
	suggested_price: number;
	uuid?: string;
	image_description?: string;
	image_url?: string; // add this
	image_public_id?: string; // optional
}
