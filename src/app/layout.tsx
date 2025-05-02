import type { Metadata } from "next";
import "@/styles/globals.scss";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider/ReactQueryClientProvider";

export const metadata: Metadata = {
	title: "Stock Overflow",
	description: "Inventory Management Solution",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<ReactQueryClientProvider>
			<html lang="en">
				<head>
					<meta name="apple-mobile-web-app-title" content="Stock Overflow" />
				</head>
				<body>{children}</body>
			</html>
		</ReactQueryClientProvider>
	);
}
