import EditInventory from "@/components/EditInventory/EditInventory";
import SOModalLayout from "@/components/SOModalLayout/SOModalLayout";

export default async function AddInventoryPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	return (
		<SOModalLayout>
			<EditInventory id={id} />
		</SOModalLayout>
	);
}
