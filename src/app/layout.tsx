import type { Metadata } from "next";
import clsx from "clsx";
import { Roboto, Rokkitt } from "next/font/google";
import "@/styles/globals.scss";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider/ReactQueryClientProvider";

const roboto = Roboto({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
});

const rokkitt = Rokkitt({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-rokkitt",
});

export const metadata: Metadata = {
	title: "Stock Overflow",
	description: "Inventory Management Solution",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={clsx(roboto.className, rokkitt.className)}>
			<head>
				<meta name="apple-mobile-web-app-title" content="Stock Overflow" />
			</head>
			<body>
				<ReactQueryClientProvider>
					<main>{children}</main>
				</ReactQueryClientProvider>
			</body>
		</html>
	);
}
