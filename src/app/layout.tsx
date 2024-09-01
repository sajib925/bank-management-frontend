import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/userContext";
import { Toaster } from "sonner";
import ClientProvider from "./ClientProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Ubuntu({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Banking Management",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <ClientProvider>
            <Navbar />
            {children}
            <Footer />
          </ClientProvider>
        </UserProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}