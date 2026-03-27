// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getHomepageConfig } from "@/lib/actions/homepage";
import { DEFAULT_HOMEPAGE_CONFIG } from "@/lib/config/homepage";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/Footer";
import Bg from "@/public/images/bg.png";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Signature By Feeha",
  description: "Make by Muhammad Jibran Rehan",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getHomepageConfig();
  const homepageConfig = config || DEFAULT_HOMEPAGE_CONFIG;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{
          backgroundImage: `url(${Bg.src})`,
          backgroundRepeat: "repeat",   // or "no-repeat" depending on your image
          backgroundSize: "auto",        // or "cover" for full-bleed
          backgroundAttachment: "fixed", // keeps bg fixed while scrolling
        }}
      >
        <CartProvider>
          {homepageConfig.announcement && (
            <AnnouncementBar text={homepageConfig.announcement} dismissible={true} />
          )}
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}