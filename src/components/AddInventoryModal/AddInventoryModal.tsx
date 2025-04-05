import React, { useContext } from "react";
import SOModal from "../SOModal/SOModal";
import { ModalContext } from "../ModalContextProvider/ModalContextProvider";
import Test from "../ImageUploader/Test";
import EditInventoryDetails from "../EditInventoryDetails/EditInventoryDetails";

const AddInventoryModal = () => {
	const { addInventoryModalIsOpen, setAddInventoryModalIsOpen } = useContext(ModalContext);

	return (
		<SOModal isOpen={addInventoryModalIsOpen} setIsOpen={setAddInventoryModalIsOpen}>
			<div>
				<EditInventoryDetails />
				<Test />
			</div>
		</SOModal>
	);
};

export default AddInventoryModal;
