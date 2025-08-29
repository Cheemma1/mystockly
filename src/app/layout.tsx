import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Nav from "./landingpage/components/Nav";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "MyStockly",
  description: "Track your sales manage customers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable}  ${plusJakartaSans.variable} min-h-screen bg-gradient-to-br from-green-50 to-orange-50 antialiased`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
