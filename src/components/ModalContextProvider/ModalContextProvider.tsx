"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface ModalContextType {
	modalIsOpen: boolean;
	setModalIsOpen: Dispatch<SetStateAction<boolean>>;
	qrCodeModalIsOpen: boolean;
	setQrCodeModalIsOpen: Dispatch<SetStateAction<boolean>>;
	addInventoryModalIsOpen: boolean;
	setAddInventoryModalIsOpen: Dispatch<SetStateAction<boolean>>;
	selectedInventoryItem: Record<string, string> | null;
	setSelectedInventoryItem: Dispatch<SetStateAction<Record<string, string> | null>>;
}

const initialModalContext: ModalContextType = {
	modalIsOpen: false,
	setModalIsOpen: () => {},
	qrCodeModalIsOpen: false,
	setQrCodeModalIsOpen: () => {},
	addInventoryModalIsOpen: false,
	setAddInventoryModalIsOpen: () => {},
	selectedInventoryItem: null,
	setSelectedInventoryItem: () => {},
};

export const ModalContext = createContext<ModalContextType>(initialModalContext);

interface ModalContextProviderProps {
	children?: ReactNode;
}

export function ModalContextProvider({ children }: ModalContextProviderProps) {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [qrCodeModalIsOpen, setQrCodeModalIsOpen] = useState(false);
	const [addInventoryModalIsOpen, setAddInventoryModalIsOpen] = useState(false);
	const [selectedInventoryItem, setSelectedInventoryItem] = useState<Record<string, string> | null>(null);

	return (
		<ModalContext.Provider
			value={{
				modalIsOpen,
				setModalIsOpen,
				selectedInventoryItem,
				setSelectedInventoryItem,
				qrCodeModalIsOpen,
				setQrCodeModalIsOpen,
				addInventoryModalIsOpen,
				setAddInventoryModalIsOpen,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
}
