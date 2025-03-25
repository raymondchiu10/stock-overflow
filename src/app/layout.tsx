import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Stock Overflow",
  description: "Inventory Management Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Stock Overflow" />
      </head>
      <body>{children}</body>
    </html>
  );
}
