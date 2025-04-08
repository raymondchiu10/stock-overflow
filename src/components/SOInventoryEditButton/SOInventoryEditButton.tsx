import React, { useContext } from "react";
import styles from "./so-inventory-edit-button.module.scss";
import Edit from "@/assets/edit.svg";
import { CellContext } from "@tanstack/react-table";
import { InventoryItem } from "../SOInventoryAdminTable/SOInventoryAdminTable";
import { ModalContext } from "../ModalContextProvider/ModalContextProvider";

interface SOInventoryDeleteButtonProps {
	props: CellContext<InventoryItem, string>;
}

const SOInventoryDeleteButton = ({ props }: SOInventoryDeleteButtonProps) => {
	const { setEditInventoryModalIsOpen: setModalIsOpen, setSelectedInventoryItem } = useContext(ModalContext);

	const editHelper = () => {
		setModalIsOpen(true);
		setSelectedInventoryItem({ ...props.row?.original });
	};

	return <Edit className={styles["so-inventory-edit-button"]} alt="edit" draggable={false} onClick={editHelper} />;
};

export default SOInventoryDeleteButton;
