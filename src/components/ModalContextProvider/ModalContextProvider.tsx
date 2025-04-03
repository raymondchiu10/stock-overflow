"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface ModalContextType {
	modalIsOpen: boolean;
	setModalIsOpen: Dispatch<SetStateAction<boolean>>;
	selectedInventoryItem: Record<string, string> | null;
	setSelectedInventoryItem: Dispatch<SetStateAction<Record<string, string> | null>>;
}

const initialModalContext: ModalContextType = {
	modalIsOpen: false,
	setModalIsOpen: () => {},
	selectedInventoryItem: null,
	setSelectedInventoryItem: () => {},
};

export const ModalContext = createContext<ModalContextType>(initialModalContext);

interface ModalContextProviderProps {
	children?: ReactNode;
}

export function ModalContextProvider({ children }: ModalContextProviderProps) {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedInventoryItem, setSelectedInventoryItem] = useState<Record<string, string> | null>(null);

	return (
		<ModalContext.Provider value={{ modalIsOpen, setModalIsOpen, selectedInventoryItem, setSelectedInventoryItem }}>
			{children}
		</ModalContext.Provider>
	);
}
