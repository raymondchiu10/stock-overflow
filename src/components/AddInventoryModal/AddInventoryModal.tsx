import React, { useContext } from "react";
import SOModal from "../SOModal/SOModal";
import { ModalContext } from "../ModalContextProvider/ModalContextProvider";
import AddInventory from "../AddInventory/AddInventory";

const AddInventoryModal = () => {
	const { addInventoryModalIsOpen, setAddInventoryModalIsOpen } = useContext(ModalContext);

	return (
		<SOModal isOpen={addInventoryModalIsOpen} setIsOpen={setAddInventoryModalIsOpen}>
			<AddInventory />
		</SOModal>
	);
};

export default AddInventoryModal;
