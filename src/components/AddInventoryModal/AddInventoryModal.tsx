import React, { useContext } from "react";
import SOModal from "../SOModal/SOModal";
import { ModalContext } from "../ModalContextProvider/ModalContextProvider";
import EditInventoryDetails from "../EditInventoryDetails/EditInventoryDetails";

const AddInventoryModal = () => {
	const { addInventoryModalIsOpen, setAddInventoryModalIsOpen } = useContext(ModalContext);

	return (
		<SOModal isOpen={addInventoryModalIsOpen} setIsOpen={setAddInventoryModalIsOpen}>
			<EditInventoryDetails />
		</SOModal>
	);
};

export default AddInventoryModal;
