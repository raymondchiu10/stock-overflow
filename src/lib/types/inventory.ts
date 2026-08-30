export interface AddInventoryFormData {
	name: string;
	description: string;
	basePrice: string;
	quantity: number;
	suggestedPrice: number;
	uuid?: string;
	imageBase64?: string; // add this
}
