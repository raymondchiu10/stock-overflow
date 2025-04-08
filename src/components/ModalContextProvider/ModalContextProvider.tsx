/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface ModalContextType {
	modalIsOpen: boolean;
	setModalIsOpen: Dispatch<SetStateAction<boolean>>;
	deleteInventoryModalIsOpen: boolean;
	setDeleteInventoryModalIsOpen: Dispatch<SetStateAction<boolean>>;
	qrCodeModalIsOpen: boolean;
	setQrCodeModalIsOpen: Dispatch<SetStateAction<boolean>>;
	addInventoryModalIsOpen: boolean;
	setAddInventoryModalIsOpen: Dispatch<SetStateAction<boolean>>;
	editInventoryModalIsOpen: boolean;
	setEditInventoryModalIsOpen: Dispatch<SetStateAction<boolean>>;
	selectedInventoryItem: Record<string, any> | null;
	setSelectedInventoryItem: Dispatch<SetStateAction<Record<string, any> | null>>;
	isAuthenticated: boolean;
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
	token: string | null;
	setToken: Dispatch<SetStateAction<string | null>>;
}

const initialModalContext: ModalContextType = {
	modalIsOpen: false,
	setModalIsOpen: () => {},

	deleteInventoryModalIsOpen: false,
	setDeleteInventoryModalIsOpen: () => {},
	qrCodeModalIsOpen: false,
	setQrCodeModalIsOpen: () => {},
	addInventoryModalIsOpen: false,
	setAddInventoryModalIsOpen: () => {},
	editInventoryModalIsOpen: false,
	setEditInventoryModalIsOpen: () => {},
	selectedInventoryItem: null,
	setSelectedInventoryItem: () => {},
	isAuthenticated: false,
	setIsAuthenticated: () => {},
	token: null,
	setToken: () => {},
};

export const ModalContext = createContext<ModalContextType>(initialModalContext);

interface ModalContextProviderProps {
	children?: ReactNode;
}

export function ModalContextProvider({ children }: ModalContextProviderProps) {
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
	const [qrCodeModalIsOpen, setQrCodeModalIsOpen] = useState<boolean>(false);
	const [addInventoryModalIsOpen, setAddInventoryModalIsOpen] = useState<boolean>(false);
	const [editInventoryModalIsOpen, setEditInventoryModalIsOpen] = useState<boolean>(false);
	const [deleteInventoryModalIsOpen, setDeleteInventoryModalIsOpen] = useState<boolean>(false);
	const [selectedInventoryItem, setSelectedInventoryItem] = useState<Record<string, string> | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [token, setToken] = useState<string | null>(null);

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
				editInventoryModalIsOpen,
				setEditInventoryModalIsOpen,
				deleteInventoryModalIsOpen,
				setDeleteInventoryModalIsOpen,
				isAuthenticated,
				setIsAuthenticated,
				token,
				setToken,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
}
