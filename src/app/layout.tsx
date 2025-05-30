import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/styles/globals.scss";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider/ReactQueryClientProvider";

const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
});

export const metadata: Metadata = {
	title: "Stock Overflow",
	description: "Inventory Management Solution",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={roboto.className}>
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
