"use client";

import { useInventoryItem } from "@/lib/useInventory";
import InventoryDetails from "../InventoryDetails/InventoryDetails";

type Props = {
	uuid: string;
};

const InventoryDetailsClient = ({ uuid }: Props) => {
	const { data, isLoading, error } = useInventoryItem(uuid);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {(error as Error).message}</p>;

	return <InventoryDetails data={data[0]} />;
};

export default InventoryDetailsClient;
