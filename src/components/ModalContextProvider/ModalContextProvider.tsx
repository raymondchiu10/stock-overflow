"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface ModalContextType {
	modalIsOpen: boolean;
	setModalIsOpen: Dispatch<SetStateAction<boolean>>;
	selectedInventoryItem: Record<string, string>;
	setSelectedInventoryItem: Dispatch<SetStateAction<Record<string, string>>>;
}

const initialModalContext: ModalContextType = {
	modalIsOpen: false,
	setModalIsOpen: () => {},
	selectedInventoryItem: {},
	setSelectedInventoryItem: () => {},
};

export const ModalContext = createContext<ModalContextType>(initialModalContext);

interface ModalContextProviderProps {
	children?: ReactNode;
}

export function ModalContextProvider({ children }: ModalContextProviderProps) {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedInventoryItem, setSelectedInventoryItem] = useState<Record<string, string>>({});

	return (
		<ModalContext.Provider value={{ modalIsOpen, setModalIsOpen, selectedInventoryItem, setSelectedInventoryItem }}>
			{children}
		</ModalContext.Provider>
	);
}
