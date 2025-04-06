import React, { useContext } from "react";
import SOModal from "@/components/SOModal/SOModal";
import { ModalContext } from "@/components/ModalContextProvider/ModalContextProvider";
import InventoryDetails from "../InventoryDetails/InventoryDetails";

const InventoryAdminDetailsModal = () => {
	const { modalIsOpen, setModalIsOpen } = useContext(ModalContext);

	return (
		<SOModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
			<InventoryDetails />
		</SOModal>
	);
};

export default InventoryAdminDetailsModal;
