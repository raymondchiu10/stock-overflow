export interface AddInventoryFormData {
	name: string;
	description: string;
	base_price: string;
	quantity: number;
	suggested_price: number;
	uuid?: string;
	imageBase64?: string; // add this
}
