import React, { Dispatch, ReactNode, SetStateAction } from "react";
import clsx from "clsx";
import styles from "./so-modal.module.scss";
import Close from "@/assets/close.svg";

interface SOModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	className?: string;
	children?: ReactNode;
}

const SOModal = ({ isOpen = false, setIsOpen, className, children }: SOModalProps) => {
	const onClickHelper = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div
			className={clsx(styles["so-modal"], {
				[styles["so-modal--open"]]: isOpen,
			})}
			onClick={onClickHelper}
		>
			<div className={styles["so-modal__container"]}>
				<div className={clsx(styles["so-modal__modal"], className)} onClick={(e) => e.stopPropagation()}>
					<div className={styles["so-modal__modal-close"]}>
						<Close onClick={onClickHelper} />
					</div>
					<div className={styles["so-modal__modal-body"]}>{children}</div>
				</div>
			</div>
		</div>
	);
};

export default SOModal;
