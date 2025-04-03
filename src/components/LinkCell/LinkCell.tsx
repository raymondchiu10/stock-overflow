import Link from "next/link";
import React, { ReactNode } from "react";

interface LinkCellProps extends React.ComponentProps<typeof Link> {
	children?: ReactNode;
}

const LinkCell = ({ children, ...props }: LinkCellProps) => {
	return <Link {...props}>{children}</Link>;
};

export default LinkCell;
