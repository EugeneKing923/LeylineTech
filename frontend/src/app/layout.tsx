import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "./components/siteHeader"
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LeyLine ",
  description: "LeyLine Backend Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" /> 
      </Head>
      <body className="flex flex-col min-h-screen">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
