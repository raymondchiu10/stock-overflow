import { createContext, ReactNode, useState } from "react";

interface ModalContextType {
	modalIsOpen: boolean;
	setModalIsOpen: (isOpen: boolean) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalContextProviderProps {
	children?: ReactNode;
}

export function ModalContextProvider({ children }: ModalContextProviderProps) {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	return <ModalContext.Provider value={{ modalIsOpen, setModalIsOpen }}>{children}</ModalContext.Provider>;
}
