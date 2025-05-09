"use client";

import { useInventoryItem } from "@/lib/useInventory";
import DeleteInventory from "../DeleteInventory/DeleteInventory";

type Props = {
	uuid: string;
};

const DeleteInventoryClient = ({ uuid }: Props) => {
	const { data, isLoading, error } = useInventoryItem(uuid);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {(error as Error).message}</p>;

	return <DeleteInventory data={data[0]} />;
};

export default DeleteInventoryClient;
