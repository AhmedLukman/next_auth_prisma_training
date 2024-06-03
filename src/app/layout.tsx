import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../providers";
import NavbarUI from "@/components/ui/NavbarUI";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="f3k86oX7X56RFj3soV6Of5GSAgeTY_YUPnv46RYXGGw"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <NavbarUI />
          {children}
        </Providers>
      </body>
    </html>
  );
}
