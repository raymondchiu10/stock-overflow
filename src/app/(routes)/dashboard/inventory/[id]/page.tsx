import InventoryDetails from "@/components/InventoryDetails/InventoryDetails";
import SOModalLayout from "@/components/SOModalLayout/SOModalLayout";
import "@/styles/globals.scss";

const AddInventoryPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;

	return (
		<SOModalLayout>
			<InventoryDetails id={id} />
		</SOModalLayout>
	);
};

export default AddInventoryPage;
