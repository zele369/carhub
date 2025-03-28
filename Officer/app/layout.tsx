import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";

export const metadata: Metadata = {
  title: "Car Rent Rental Offier Site",
  description: "The place where you will find the best cars in your need.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`relative`}>{children}</body>
      </AuthProvider>
    </html>
  );
}
