import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: "300",
});

export const metadata: Metadata = {
  title: "poraneo",
  description: "arquitetura | mobiliário | expografia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} !lowercase antialiased bg-[var(--background)]`}
      >
        {children}
      </body>
    </html>
  );
}
