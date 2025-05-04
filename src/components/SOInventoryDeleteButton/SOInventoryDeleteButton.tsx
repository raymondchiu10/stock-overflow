import React from "react";
import styles from "./so-inventory-delete-button.module.scss";
import Delete from "@/assets/delete.svg";
import { CellContext } from "@tanstack/react-table";
import { InventoryItem } from "../SOInventoryAdminTable/SOInventoryAdminTable";
import { useRouter } from "next/navigation";

interface SOInventoryDeleteButtonProps {
	props: CellContext<InventoryItem, string>;
}

const SOInventoryDeleteButton = ({ props }: SOInventoryDeleteButtonProps) => {
	const router = useRouter();

	const deleteHelper = () => {
		router.push(`/dashboard/delete-inventory/${props.getValue()}`, { scroll: false });
	};

	return (
		<Delete
			className={styles["so-inventory-delete-button"]}
			alt="delete"
			draggable={false}
			onClick={deleteHelper}
		/>
	);
};

export default SOInventoryDeleteButton;
