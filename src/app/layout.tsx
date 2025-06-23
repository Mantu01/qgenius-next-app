import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./store/storeProvider";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/Footer";
import Sidebar from "@/components/layout/Sidebar";
import {ToastContainer} from 'react-toastify'
import GetUser from "@/hooks/useUser";
import { Suspense } from "react";
import {Analytics} from '@vercel/analytics/next'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QGenius",
  description: "Notes provider",
  icons:{
    icon:"https://res.cloudinary.com/dqznmhhtv/image/upload/v1745812881/image__1_-removebg-preview_cq7xid.png"
  },
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <Suspense>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ToastContainer position="top-center" draggable />
          <StoreProvider>
            <GetUser/>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <div className="flex flex-1 pt-16 relative">
                <Sidebar />
                <main className="flex-1 bg-gray-50 dark:bg-gray-900 transition-colors duration-200 w-full">
                  {children}
                </main>
              </div>
              <Footer />
            </div>
          </StoreProvider>
          <Analytics/>
        </body>
      </Suspense>
      
    </html>
  );
}