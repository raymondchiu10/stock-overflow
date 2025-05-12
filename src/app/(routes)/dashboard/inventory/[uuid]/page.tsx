import SOModalLayout from "@/components/SOModalLayout/SOModalLayout";
import InventoryDetailsClient from "@/components/InventoryDetailsClient/InventoryDetailsClient";

const InventoryPage = async ({ params }: { params: Promise<{ uuid: string }> }) => {
	const { uuid } = await params;
	return (
		<SOModalLayout>
			<InventoryDetailsClient uuid={uuid} />
		</SOModalLayout>
	);
};

export default InventoryPage;
