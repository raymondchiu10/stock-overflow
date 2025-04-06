import React, { useContext } from "react";
import styles from "./so-inventory-delete-button.module.scss";
import Delete from "@/assets/delete.svg";
import { CellContext } from "@tanstack/react-table";
import { InventoryItem } from "../SOInventoryAdminTable/SOInventoryAdminTable";
import { ModalContext } from "../ModalContextProvider/ModalContextProvider";

interface SOInventoryDeleteButtonProps {
	props: CellContext<InventoryItem, string>;
}

const SOInventoryDeleteButton = ({ props }: SOInventoryDeleteButtonProps) => {
	const { setDeleteInventoryModalIsOpen: setModalIsOpen, setSelectedInventoryItem } = useContext(ModalContext);

	const deleteHelper = () => {
		setModalIsOpen(true);
		setSelectedInventoryItem({ inventoryUuid: props.getValue() });
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
