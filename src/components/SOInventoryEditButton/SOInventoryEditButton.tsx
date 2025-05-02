import React from "react";
import styles from "./so-inventory-edit-button.module.scss";
import Edit from "@/assets/edit.svg";
import { CellContext } from "@tanstack/react-table";
import { InventoryItem } from "../SOInventoryAdminTable/SOInventoryAdminTable";

interface SOInventoryDeleteButtonProps {
	props: CellContext<InventoryItem, string>;
}

const SOInventoryDeleteButton = ({ props }: SOInventoryDeleteButtonProps) => {
	const editHelper = () => {
		console.log({ ...props.row?.original });
	};

	return <Edit className={styles["so-inventory-edit-button"]} alt="edit" draggable={false} onClick={editHelper} />;
};

export default SOInventoryDeleteButton;
