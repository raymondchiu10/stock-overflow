import EditInventory from "@/components/EditInventory/EditInventory";
import SOModalLayout from "@/components/SOModalLayout/SOModalLayout";

export default async function AddInventoryPage({ params }: { params: Promise<{ uuid: string }> }) {
	const { uuid } = await params;

	return (
		<SOModalLayout>
			<EditInventory uuid={uuid} />
		</SOModalLayout>
	);
}
