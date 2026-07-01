import type React from "react";
import type { Metadata } from "next";
import { Poppins, Nunito } from "next/font/google";
import "./globals.css";

/* ================= FONT ================= */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-nunito",
});

/* ================= METADATA ================= */
export const metadata: Metadata = {
  title: "FinProjek - Monitoring Proyek",
  description: "Aplikasi monitoring proyek (versi testing SUS)",
};

/* ================= ROOT LAYOUT ================= */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}