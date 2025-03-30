import React from "react";

const SOButton = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
	return <button {...props}>{props.children || "SO Button"}</button>;
};

export default SOButton;
