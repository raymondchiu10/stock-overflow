import clsx from "clsx";
import React, { Dispatch, ReactNode, SetStateAction } from "react";

interface SOModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	className: string;
	children: ReactNode;
}

const SOModal = ({ isOpen = false, setIsOpen, className, children }: SOModalProps) => {
	const onClickHelper = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div
			className={clsx("instock-modal", {
				"instock-modal--open": isOpen,
			})}
			onClick={onClickHelper}
		>
			<div className="instock-modal__container">
				<div className={clsx("instock-modal__modal", className)} onClick={(e) => e.stopPropagation()}>
					<div className="instock-modal__modal-close">
						<Close onClick={onClickHelper} />
					</div>
					<div className="instock-modal__modal-body">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default SOModal;
