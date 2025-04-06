import React, { useContext } from "react";
import SOModal from "../SOModal/SOModal";
import { ModalContext } from "../ModalContextProvider/ModalContextProvider";
import { useInventoryItem } from "@/lib/useInventory";
import styles from "./inventory-delete-modal.module.scss";
import { useDeleteInventoryItem } from "@/lib/useDeleteInventoryItem";

const InventoryDeleteModal = () => {
	const {
		deleteInventoryModalIsOpen: modalIsOpen,
		setDeleteInventoryModalIsOpen: setModalIsOpen,
		selectedInventoryItem,
		setSelectedInventoryItem,
	} = useContext(ModalContext);

	const inventoryUuid = selectedInventoryItem?.inventoryUuid || "";

	const { data } = useInventoryItem(inventoryUuid);

	const { mutate } = useDeleteInventoryItem(inventoryUuid);

	const deleteHelper = () => {
		if (inventoryUuid) {
			mutate(undefined, {
				onSuccess: () => {
					// Only close and reset on successful deletion
					setSelectedInventoryItem(null);
					setModalIsOpen(false);
				},
				onError: (error) => {
					console.error("Failed to delete inventory:", error);
					// You might want to show an error message to the user
				},
			});
		}
	};

	const closeHelper = () => {
		setModalIsOpen(false);
	};

	return (
		<SOModal isOpen={modalIsOpen} setIsOpen={closeHelper}>
			<div className={styles["inventory-delete-modal"]}>
				<h2>Delete Inventory item {data && data[0]?.name}?</h2>
				<p>This is a permanent action that cannot be undone.</p>

				<div className={styles["inventory-delete-modal__buttons"]}>
					<button onClick={closeHelper}>Cancel</button>
					<button onClick={deleteHelper}>DELETE</button>
				</div>
			</div>
		</SOModal>
	);
};

export default InventoryDeleteModal;
