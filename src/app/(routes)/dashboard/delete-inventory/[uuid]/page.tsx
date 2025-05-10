import DeleteInventoryClient from "@/components/DeleteInventoryClient/DeleteInventoryClient";
import SOModalLayout from "@/components/SOModalLayout/SOModalLayout";

export default async function AddInventoryPage({ params }: { params: { uuid: string } }) {
	const { uuid } = await params;

	return (
		<SOModalLayout>
			<DeleteInventoryClient uuid={uuid} />
		</SOModalLayout>
	);
}
