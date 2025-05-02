import React from "react";
import styles from "./so-inventory-delete-button.module.scss";
import Delete from "@/assets/delete.svg";
import { CellContext } from "@tanstack/react-table";
import { InventoryItem } from "../SOInventoryAdminTable/SOInventoryAdminTable";

interface SOInventoryDeleteButtonProps {
	props: CellContext<InventoryItem, string>;
}

const SOInventoryDeleteButton = ({ props }: SOInventoryDeleteButtonProps) => {
	const deleteHelper = () => {
		console.log({ inventoryUuid: props.getValue() });
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
