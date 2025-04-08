import React, { useContext } from "react";
import SOModal from "../SOModal/SOModal";
import { ModalContext } from "../ModalContextProvider/ModalContextProvider";
import EditInventory from "../EditInventory/EditInventory";

const EditInventoryModal = () => {
	const { editInventoryModalIsOpen, setEditInventoryModalIsOpen } = useContext(ModalContext);

	return (
		<SOModal isOpen={editInventoryModalIsOpen} setIsOpen={setEditInventoryModalIsOpen}>
			<EditInventory />
		</SOModal>
	);
};

export default EditInventoryModal;
