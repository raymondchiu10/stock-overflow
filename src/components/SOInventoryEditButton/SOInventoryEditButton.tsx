import React from "react";
import styles from "./so-inventory-edit-button.module.scss";
import Edit from "@/assets/edit.svg";
import { CellContext } from "@tanstack/react-table";
import { InventoryItem } from "../SOInventoryAdminTable/SOInventoryAdminTable";
import { useRouter } from "next/navigation";

interface SOInventoryDeleteButtonProps {
	props: CellContext<InventoryItem, string>;
}

const SOInventoryDeleteButton = ({ props }: SOInventoryDeleteButtonProps) => {
	const router = useRouter();
	const { uuid } = props.row?.original;

	const editHelper = () => {
		router.push(`/dashboard/edit-inventory/${uuid}`, { scroll: false });
	};

	return <Edit className={styles["so-inventory-edit-button"]} alt="edit" draggable={false} onClick={editHelper} />;
};

export default SOInventoryDeleteButton;
